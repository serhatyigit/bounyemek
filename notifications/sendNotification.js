import * as Notifications from "expo-notifications";

const sendNotification = (title, list, hour, minute) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: listToText(list),
    },

    trigger: {
      hour: hour,
      minute: minute,
      repeats: false,
    },
  });
};

const listToText = (list) => {};

export default sendNotification;
