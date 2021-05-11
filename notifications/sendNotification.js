import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
  }),
});

const sendNotification = (title, list, hour, minute) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: bodyHandler(list),
    },
    trigger: {
      hour: hour,
      minute: minute,
      repeats: false,
    },
  });
};

const bodyHandler = (list) => {
  const favoritesInList = list.filter((meal) => meal.isFav === true);
  const unfavoritesInList = list.filter((meal) => meal.isFav === false);

  let text = `${listToText(list)}`;

  if (favoritesInList.length > 0) {
    text = `Favorilerden: ${listToText(favoritesInList)}`;
    if (unfavoritesInList.length > 0) {
      text += ` / Ayrıca: ${listToText(unfavoritesInList)}`;
    }
  }

  return text;
};

const listToText = (list) => {
  let text = `${list[0].title}`;
  if (list.length > 1) {
    for (let i = 1; i < list.length; i++) {
      text += `, ${list[i].title}`;
    }
  }

  return text;
};

export default sendNotification;
