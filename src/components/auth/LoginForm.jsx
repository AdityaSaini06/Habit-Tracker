import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email(),
  password_hash: z.string().min(4, 'Password must be at least 4 characters'),
});

export default function LoginForm() {
    const navigate = useNavigate();
    const form = useForm({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: '',
        password_hash: '',
      },
    });
  
    const onSubmit = async (data) => {
      try {
        const res = await api.post('/api/auth/login', data);
        if (res.token) {
          localStorage.setItem('token', res.token);
          toast.success('Login successful!');
          navigate('/');
        } else {
          toast.error('Invalid login credentials');
        }
      } catch (err) {
        console.error(err);
        toast.error('Login failed, please try again');
      }
    };
  
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            LogIn To KeepStreak
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        className="h-11 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="password_hash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="h-11 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-md transition-all duration-200"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }
  