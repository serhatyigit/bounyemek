import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotifSetting } from "../store/actions/meals";

const SettingsScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Bildirim Ayarları",
      headerBackTitleStyle: {
        fontSize: 14,
      },
    });
  }, [navigation]);

  const dispatch = useDispatch();

  const [notifyAtOnlyFavs, setnotifyAtOnlyFavs] = useState(
    useSelector((state) => state.meals.notifyAtOnlyFavs)
  );

  const toggleSwitch = () => {
    setnotifyAtOnlyFavs((previousState) => !previousState);
    dispatch(toggleNotifSetting(!notifyAtOnlyFavs));
  };

  return (
    <View style={styles.settingsScreen}>
      <View style={styles.switchContainer}>
        <View>
          <Text style={styles.switchText}>Sadece favorilerde bildirim al</Text>
        </View>
        <View style={styles.switchView}>
          <Switch
            ios_backgroundColor="#3e3e3e"
            trackColor={{ false: "#767577", true: "#00bfff" }}
            onValueChange={toggleSwitch}
            value={notifyAtOnlyFavs}
          />
        </View>
      </View>
      <View style={styles.detailTextView}>
        <Text style={styles.detailText}>
          Bu seçenek açık olduğunda sadece favori yemeklerinizin olduğu öğünlerde bildirim alırsınız.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsScreen: {
    backgroundColor: "white",
    height: "100%", // or flex: 1
    alignItems: "center",
  },
  switchContainer: {
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    fontSize: 18,
    color: "#00bfff",
    fontWeight: "600",
  },
  switchView: {
    paddingLeft: 25,
  },
  detailTextView: {
    paddingTop: 20,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 18,
    color: "#00bfff",
    fontWeight: "500",
  },
});

export default SettingsScreen;
