import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function useHabits() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHabits = async () => {
    setLoading(true);
    try {
        const data = await api.get("/api/habits");
        setHabits(data);
    } catch (err) {
        console.error("Failed to fetch habits", err);
    } finally {
        setLoading(false);
    }
    };

    const addHabit = async (habit) => {
        try {
            const newHabit = await api.post("/api/habits", habit);
            setHabits((prev) => [...prev, newHabit]);
            return true;
        } catch {
            return false;
        }
        };

        const updateHabit = async (id, updatedHabit) => {
        try {
            const habit = await api.put(`/api/habits/${id}`, updatedHabit);
            setHabits((prev) => prev.map((h) => (h.id === id ? habit : h)));
            return true;
        } catch {
            return false;
        }
        };

        const deleteHabit = async (id) => {
        try {
            await api.delete(`/api/habits/${id}`);
            setHabits((prev) => prev.filter((h) => h.id !== id));
            return true;
        } catch {
            return false;
        }
        };
    
    
    useEffect(() => {
    fetchHabits();
    }, []);

return { habits, loading, addHabit, updateHabit, deleteHabit };
}
