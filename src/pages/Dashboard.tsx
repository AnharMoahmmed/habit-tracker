import { useHabits } from '../hooks/useHabits';
import { calculateStreak, isCompletedToday } from '../utils/dateUtils';
import { format } from 'date-fns'; 
import { HabitList } from '../components/HabitList';
import { StreakCard } from '../components/StreakCard';
import { ProgressChart } from '../components/ProgressChart';
import { Plus } from 'lucide-react';

 
export const Dashboard: React.FC = () => {
  const { habits, toggleHabit, togglePin } = useHabits();
 
  // Stats
  const bestStreak = habits.length > 0 ? Math.max(...habits.map(h => calculateStreak(h.completedDates))) : 0;

  // Categorize Habits
  const pinnedHabits = habits.filter(h => h.isPinned && h.isActive);
  const pendingHabits = habits.filter(h => !h.isPinned && !isCompletedToday(h.completedDates)&& h.isActive);
  const completedHabits = habits.filter(h => !h.isPinned && isCompletedToday(h.completedDates)&& h.isActive);
 
  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-sm w-full md:w-auto justify-center">
          <Plus size={20} /> Create Habit
        </button>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StreakCard bestStreak={bestStreak} />
        <ProgressChart habits={habits} />
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {pinnedHabits.length > 0 && (
            <HabitList 
              title="📌 Pinned Priority" 
              habits={pinnedHabits} 
              toggleHabit={toggleHabit} 
              togglePin={togglePin} 
            />
          )}
          <HabitList 
            title="🎯 To-Do Today" 
            habits={pendingHabits} 
            toggleHabit={toggleHabit} 
            togglePin={togglePin} 
            emptyMessage="🎉 All caught up for today!" 
          />
        </div>
        
        <div>
          <HabitList 
            title="✅ Completed" 
            habits={completedHabits} 
            toggleHabit={toggleHabit} 
            togglePin={togglePin} 
            emptyMessage="Nothing completed yet today. Let's get started!" 
          />
        </div>
      </div>
    </div>
  );
};