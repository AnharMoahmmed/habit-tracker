import { useEffect, useRef } from 'react';
import type{ Habit } from '../types';
import { isCompletedToday } from '../utils/dateUtils';
import { format } from 'date-fns';

export function useReminders(habits: Habit[]) {
  // We use a Set to remember which habits we already notified today so we don't spam the user
  const notifiedToday = useRef<Set<string>>(new Set());

  useEffect(() => {
    // 1. Ask the browser for permission to send notifications
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    // 2. Set up a timer to check the clock every 30 seconds
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = format(now, 'HH:mm'); // e.g., "14:30"
      const todayStr = format(now, 'yyyy-MM-dd'); // e.g., "2023-10-25"

      habits.forEach(habit => {
        // Skip if habit is inactive, has no reminder, or is already completed today
        if (!habit.isActive || !habit.reminderTime || isCompletedToday(habit.completedDates)) return;

        // If the current time matches the habit's reminder time...
        if (habit.reminderTime === currentTime) {
          const notificationKey = `${habit.id}-${todayStr}`; // Unique key for today
          
          // Check if we haven't already notified them today for this habit
          if (!notifiedToday.current.has(notificationKey)) {
            
            // Fire the notification!
            if (Notification.permission === "granted") {
              new Notification("Habit Reminder ⏰", {
                body: `It's time to: ${habit.name}`,
              });
            }
            
            // Mark as notified so it doesn't fire again in the next 30 seconds
            notifiedToday.current.add(notificationKey);
          }
        }
      });
    }, 30000); // 30000ms = 30 seconds

    return () => clearInterval(interval); // Cleanup when app closes
  }, [habits]);
}