export interface Habit {
    id: string;
    name: string;
    createdAt: string; // ISO string
    completedDates: string[]; // Array of dates ("YYYY-MM-DD")
    isPinned: boolean; 
    isActive: boolean;
  }

export interface UserSettings{
    theme: 'light' | 'dark' | 'system';
    notificationsEnabled: boolean ;
    reminderTime: string ;
    language: string ;
}