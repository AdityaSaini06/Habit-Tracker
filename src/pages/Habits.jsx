import useHabits from '@/hooks/useHabits';
import HabitCard from '@/components/habits/HabitCard';
import HabitForm from '@/components/habits/HabitForm';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Habits() {
  const { habits, loading, addHabit, updateHabit, deleteHabit } = useHabits();
  const [editingHabit, setEditingHabit] = useState(null);

  const handleAdd = async (data) => {
    try {
      const success = await addHabit(data);
      return success; // true/false
    } catch {
      return false;
    }
  };

  const handleEdit = async (data) => {
    try {
      const success = await updateHabit(editingHabit.id, data);
      if (success) setEditingHabit(null);
      return success;
    } catch {
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      const success = await deleteHabit(id);
      if (success) {
        toast.success('Habit deleted!');
        if (editingHabit && editingHabit.id === id) {
          setEditingHabit(null);
        }
      } else {
        toast.error('Failed to delete habit.');
      }
      return success;
    } catch (error) {
      toast.error('Failed to delete habit.');
      return false;
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">My Habits</h1>

      <HabitForm
        onSubmitHabit={editingHabit ? handleEdit : handleAdd}
        editingHabit={editingHabit}
        onCancel={() => setEditingHabit(null)}  // allow cancelling edit
      />

      {loading ? (
        <p className="text-center text-gray-500">Loading habits...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onEdit={setEditingHabit}
              onDelete={handleDelete}  
            />
          ))}
        </div>
      )}
    </div>
  );
}
