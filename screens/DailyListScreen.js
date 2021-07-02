import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import DailyListItem from "../components/DailyListItem";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { dayNames, monthNames } from "../data/dateNames";
import { askPermission, createNotificationAlert } from "../notifications/askPermission";
import sendNotification from "../notifications/sendNotification";

const TodayListScreen = ({ navigation }) => {
  const lunchList = useSelector((state) => state.meals.lunchList);
  const dinnerList = useSelector((state) => state.meals.dinnerList);

  const date = new Date();
  const dayOfNotification = date.getDate();

  const notifyAtOnlyFavs = useSelector((state) => state.meals.notifyAtOnlyFavs);

  let notificationPermission;

  useEffect(() => {
    notificationPermission = askPermission().then((status) => {
      if (!status) {
        createNotificationAlert();
      }
    });
  }, []);

  useEffect(() => {
    if (notificationPermission) {
      const dailyLunchList = lunchList[dayOfNotification - 1];
      const dailyDinnerList = dinnerList[dayOfNotification - 1];
      if (!notifyAtOnlyFavs) {
        sendNotification("Öğle Yemeği", dailyLunchList, 9, 13);
        sendNotification("Akşam Yemeği", dailyDinnerList, 9, 12);
      } else {
        const hasAnyFavInLunch = dailyLunchList.some((meal) => meal.isFav === true);
        const hasAnyFavInDinner = dailyDinnerList.some((meal) => meal.isFav === true);

        hasAnyFavInLunch.length > 0 ? sendNotification("Öğle Yemeği", dailyLunchList, 11, 0) : null;
        hasAnyFavInDinner.length > 0 ? sendNotification("Akşam Yemeği", dailyDinnerList, 16, 0) : null;
      }
    }
  }, [dayOfNotification]);

  const [day, setDay] = useState(date.getDate());
  const [dayNum, setDayNum] = useState(date.getDay());

  let month = monthNames[date.getMonth()];
  const [currentDate, setCurrentDate] = useState(`  Bugün \n ${day} ${month}    ${dayNames[dayNum]} `);

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const DaysInCurrentMonth = daysInMonth(date.getMonth() + 1, date.getFullYear());

  const changeDay = (direction) => {
    switch (direction) {
      case "prev":
        if (day > 1) {
          setDay(day - 1);
          setDayNum(dayNumDecrease(dayNum));
        } else {
          createAlert();
        }
        break;
      case "next":
        if (day < DaysInCurrentMonth) {
          setDay(day + 1);
          setDayNum((dayNum + 1) % 7);
        } else {
          createAlert();
        }
        break;
    }
  };

  const dayNumDecrease = (dayNum) => {
    if (dayNum <= 0) {
      dayNum += 7;
    }
    return (dayNum - 1) % 7;
  };

  useEffect(() => {
    date.getDate() === day
      ? setCurrentDate(`Bugün ${day} ${month} \n            ${dayNames[dayNum]} `)
      : setCurrentDate(`${day} ${month} \n       ${dayNames[dayNum]} `);
  }, [day]);

  const createAlert = () =>
    Alert.alert("Uyarı", "Sadece bu ayki listeyi görüntüleyebilirsiniz", [
      {
        text: "Tamam",
        style: "cancel",
      },
    ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Günlük Liste",
      headerTintColor: "#00bfff",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Settings"
            iconName="md-notifications-outline"
            onPress={() => navigation.navigate("SettingsScreen")}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Info"
            iconName="ios-information-circle"
            onPress={() => navigation.navigate("InfoScreen")}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const LunchRenderItem = ({ item }) =>
    item.title !== "empty" ? (
      <DailyListItem title={item.title} isFav={item.isFav} id={item.id} type={"lunch"} />
    ) : (
      <Text style={{ ...styles.lunchNameText, ...styles.noServiceText }}>
      Bu öğünde yemek servisi mevcut değil
    </Text>
    );
  const DinnerRenderItem = ({ item }) =>
    item.title !== "empty" ? (
      <DailyListItem title={item.title} isFav={item.isFav} id={item.id} type={"dinner"} />
    ) : (
      <Text style={{ ...styles.dinnerNameText, ...styles.noServiceText }}>
        Bu öğünde yemek servisi mevcut değil
      </Text>
    );

  return (
    <View style={styles.todayListView}>
      <View style={styles.dateView}>
        <View style={styles.prevDayButtonView}>
          <TouchableOpacity style={styles.buttonView} onPress={() => changeDay("prev")}>
            <AntDesign name="left" size={24} color="red" />
            <Text style={styles.prevDayButtonText}>{`Önceki \n   Gün`}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
        <View style={styles.nextDayButtonView}>
          <TouchableOpacity style={styles.buttonView} onPress={() => changeDay("next")}>
            <Text style={styles.nextDayButtonText}>{`Sonraki \n   Gün`}</Text>
            <AntDesign name="right" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lunchNameView}>
        <Text style={styles.lunchNameText}>ÖĞLE YEMEĞİ</Text>
      </View>
      <View style={styles.CardViewContainer}>
        <View style={styles.lunchCardView}>
          <FlatList
            data={lunchList[day - 1]}
            renderItem={LunchRenderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View style={styles.lunchNameView}>
        <Text style={styles.dinnerNameText}>AKŞAM YEMEĞİ</Text>
      </View>
      <View style={styles.CardViewContainer}>
        <View style={styles.dinnerCardView}>
          <FlatList
            data={dinnerList[day - 1]}
            renderItem={DinnerRenderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todayListView: {
    backgroundColor: "white",
    flex: 1,
  },
  dateView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    color: "darkblue",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 8,
  },
  prevDayButtonText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
  nextDayButtonText: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  buttonView: {
    flexDirection: "row",
    paddingTop: 10,
  },
  lunchCardView: {
    // height: "100%",
    maxHeight: "100%",
    borderWidth: 3.5,
    borderRadius: 20,
    borderColor: Colors.lunchColor,
    width: "75%",
    paddingVertical: 4,
  },
  dinnerCardView: {
    // height: "100%",
    maxHeight: "100%",
    borderWidth: 3.5,
    borderRadius: 20,
    borderColor: Colors.dinnerColor,
    width: "75%",
    paddingVertical: 4,
  },
  CardViewContainer: {
    alignItems: "center",
    marginTop: 5,
    flex: 1,
  },
  prevDayButtonView: {
    paddingLeft: "5%",
  },
  nextDayButtonView: {
    paddingRight: "5%",
  },
  lunchNameView: {
    alignItems: "center",
    paddingVertical: 10,
  },
  lunchNameText: {
    fontSize: 20,
    color: Colors.lunchColor,
    fontWeight: "bold",
  },
  dinnerNameText: {
    fontSize: 20,
    color: Colors.dinnerColor,
    fontWeight: "bold",
  },
  noServiceText: {
    alignSelf: "center",
    padding: "10%",
  },
});

export default TodayListScreen;
