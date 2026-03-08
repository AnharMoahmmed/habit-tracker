import { useState, useEffect } from 'react';
import type { Habit } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: uuidv4(),
      name,
      createdAt: new Date().toISOString(),
      completedDates: [],
      isPinned: false,
      isActive: true, // <-- NEW
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (id: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const isCompleted = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: isCompleted 
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today]
        };
      }
      return habit;
    }));
  };

  const togglePin = (id: string) => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, isPinned: !habit.isPinned } : habit));
  };

  // NEW: Delete Habit
  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  // NEW: Edit Habit
  const editHabit = (id: string, newName: string) => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, name: newName } : habit));
  };

  // NEW: Toggle Active/Inactive
  const toggleActive = (id: string) => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, isActive: !habit.isActive } : habit));
  };

  return { habits, addHabit, toggleHabit, togglePin, deleteHabit, editHabit, toggleActive };
}