import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
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

const registerSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email(),
    password_hash: z.string().min(4, 'Password must be at least 4 characters'),
    confirm_password: z
      .string()
      .min(4, 'Confirm password must be at least 4 characters'),
  })
  .refine((data) => data.password_hash === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password_hash: '',
      confirm_password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { confirm_password, ...payload } = data;
      const res = await api.post('/api/auth/register', payload);
      if (res.message === 'User Registered Successfully.') {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        toast.error('Registration failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Registration failed, please try again');
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 px-12 py-8">

          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              Create Account
            </h2>
            <p className="text-gray-600">Join KeepStreak to start tracking your habits</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Username</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <FormControl>
                        <Input {...field} placeholder="Enter username" className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <FormControl>
                        <Input {...field} type="email" placeholder="Enter email" className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password_hash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          className="pl-10 pr-10"
                        />
                      </FormControl>
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Confirm Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <FormControl>
                        <Input
                          {...field}
                          type={showConfirm ? 'text' : 'password'}
                          placeholder="Confirm password"
                          className="pl-10 pr-10"
                        />
                      </FormControl>
                      <div
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium mt-6 w-full h-12 transition-colors duration-200"
              >
                {form.formState.isSubmitting ? 'Creating...' : 'Create Account'}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline font-medium">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
