import { differenceInDays, parseISO, subDays, format, eachDayOfInterval } from 'date-fns';

// Check if a habit is completed today
export const isCompletedToday = (completedDates: string[]) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return completedDates.includes(today);
};

// Calculate streak
export const calculateStreak = (completedDates: string[]) => {
  let streak = 0;
  const today = new Date();
  
  // Start checking from today, going backwards
  while (true) {
    const dateToCheck = format(subDays(today, streak), 'yyyy-MM-dd');
    if (completedDates.includes(dateToCheck)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

// Calculate weekly progress (e.g., 5/7 days)
export const calculateWeeklyProgress = (completedDates: string[]) => {
  const today = new Date();
  let count = 0;
  
  for (let i = 0; i < 7; i++) {
    const dateToCheck = format(subDays(today, i), 'yyyy-MM-dd');
    if (completedDates.includes(dateToCheck)) {
      count++;
    }
  }
  return count;
};

// NEW: Calculate overall completion percentage
export const calculateCompletionRate = (completedDates: string[], createdAt: string) => {
    const totalDaysActive = Math.max(1, differenceInDays(new Date(), parseISO(createdAt)) + 1);
    return Math.round((completedDates.length / totalDaysActive) * 100);
  };
  
  // NEW: Generate data for the last X days (for charts)
  export const generateChartData = (habits: any[], days: number) => {
    const today = new Date();
    const startDate = subDays(today, days - 1);
    
    const dateRange = eachDayOfInterval({ start: startDate, end: today });
  
    return dateRange.map(date => {
      const dateString = format(date, 'yyyy-MM-dd');
      const displayLabel = days <= 7 ? format(date, 'EEE') : format(date, 'MMM dd');
      
      // Count how many habits were completed on this date
      const completedCount = habits.filter(h => h.completedDates.includes(dateString)).length;
  
      return {
        date: displayLabel,
        completed: completedCount,
        total: habits.length
      };
    });
  };