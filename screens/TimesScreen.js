import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Table, Row, Rows } from "react-native-table-component";

import HeaderButton from "../components/HeaderButton";

const TimesScreen = ({ navigation }) => {
  const weekDayTimes = {
    tableHead: ["Kuzey", "Güney", "Kilyos", "Kandilli", "Hisar"],
    tableData: [
      ["07:30\n09:30", "07:30\n09:30", "07:30\n10:00", "07:30\n09:30", "-"],
      [
        "11:30\n14:30",
        "12:15\n14:30",
        "12:00\n15:00",
        "11:30\n14:30",
        "11:30\n14:30",
      ],
      ["17:00\n19:00", "17:00\n19:00", "17:00\n19:00", "17:00\n19:00", "-"],
    ],
  };

  const weekendTimes = {
    tableHead: ["Kuzey", "Güney", "Kilyos", "Kandilli", "Hisar"],
    tableData: [
      ["08:30\n10:00", "08:30\n10:00", "08:00\n10:30", "08:30\n10:00", "-"],
      ["12:00\n13:45", "12:00\n13:45", "12:00\n13:45", "12:00\n13:45", "-"],
      ["17:30\n19:30", "17:30\n19:30", "17:30\n19:30", "17:30\n19:30", "-"],
    ],
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Yemek Saatleri",
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

  return (
    <View style={styles.timeScreen}>
      <View style={styles.weekDayTextView}>
        <Text style={styles.weekDayText}>Hafta İçi</Text>
      </View>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#00bfff" }}>
          <Row
            data={weekDayTimes.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={weekDayTimes.tableData} textStyle={styles.text} />
        </Table>
      </View>
      <View style={styles.weekDayTextView}>
        <Text style={styles.weekDayText}>Hafta Sonu</Text>
      </View>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#00bfff" }}>
          <Row
            data={weekendTimes.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={weekendTimes.tableData} textStyle={styles.text} />
        </Table>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeScreen: {
    justifyContent: "space-around",
    height: "100%",
    backgroundColor: "white",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weekDayText: {
    fontSize: 18,
    color: "#00bfff",
    fontWeight: "bold",
  },
  weekDayTextView: {
    alignItems: "center",
    marginTop: 5,
  },
  container: { flex: 1, paddingHorizontal: 12, paddingTop: 15 },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: {
    fontSize: 15,
    margin: 8,
    alignSelf: "center",
  },
});

export default TimesScreen;
