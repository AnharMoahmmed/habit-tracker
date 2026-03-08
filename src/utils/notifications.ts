export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
      return;
    }
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };
  
  export const sendReminder = (habitName: string) => {
    if (Notification.permission === "granted") {
      new Notification("Habit Reminder! 🚀", {
        body: `Don't forget to complete your habit: ${habitName}`,
      });
    }
  };