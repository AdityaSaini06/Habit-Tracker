export default function HabitCard({ habit, onEdit, onDelete }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold">{habit.name}</h3>
            <p className="text-sm text-gray-700">{habit.goal}</p>
            <p className="text-xs text-gray-600 italic">Frequency: {habit.frequency}</p>
            <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => onEdit(habit)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => onDelete(habit.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
        </div>
    );
}