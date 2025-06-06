import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const habitSchema = z.object({
    name: z.string().min(1, "Habit name is required"),
    frequency: z.enum(["daily", "weekly", "custom"]),
    color: z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Invalid color"),
    });

    export default function HabitForm({ onSubmitHabit, editingHabit }) {
    const form = useForm({
        resolver: zodResolver(habitSchema),
        defaultValues: {
        name: "",
        frequency: "daily",
        color: "#3b82f6",
        },
    });

    useEffect(() => {
        if (editingHabit) {
        form.reset(editingHabit);
        }
    }, [editingHabit]);

    const onSubmit = async (values) => {
        try {
            const success = await onSubmitHabit(values);
            if (success) {
                toast.success(editingHabit ? "Habit updated!" : "Habit added!");
                form.reset();
            } else {
                toast.error("Something went wrong.");
            }
            } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
            }
        };      
    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
            {editingHabit ? "Edit Habit" : "Add New Habit"}
        </h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Habit Name</FormLabel>
                    <FormControl>
                    <Input
                        placeholder="e.g. Meditation"
                        {...field}
                        className="h-11"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <FormControl>
                        <select
                        {...field}
                        className="h-11 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="custom">Custom</option>
                        </select>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                        <input
                        type="color"
                        {...field}
                        className="h-11 w-full rounded border border-gray-300"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-md transition-all duration-200"
            >
                {editingHabit ? "Update Habit" : "Add Habit"}
            </Button>
            </form>
        </Form>
        </div>
    );
    }
