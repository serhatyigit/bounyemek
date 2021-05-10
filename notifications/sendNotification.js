import * as Notifications from "expo-notifications";

const sendNotification = (title, body, hour, minute) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },

    trigger: {
      hour: hour,
      minute: minute,
      repeats: true,
    },
  });
};

const listToText = (list) => {};

export default sendNotification;
