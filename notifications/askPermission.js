import * as Permissions from "expo-permissions";
import { Alert } from "react-native";

export const askPermission = async () => {
  try {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const createNotificationAlert = () => {
  Alert.alert(
    "Bildirim İzni Kapalı",
    "Yemek saatinden önce listeyi bildirim olarak almak istiyorsanız bildirimlere izin vermelisiniz. \n Ayarlar > Bildirim ayarlarından bildirim seçeneğini açabilirsiniz.",
    [
      {
        text: "Tamam",
        style: "cancel",
        onPress: () => {},
      },
    ]
  );
};
