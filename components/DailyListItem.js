import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";

const TodayListItem = (props) => {
  const color = props.type === "lunch" ? Colors.lunchColor : Colors.dinnerColor;

  let footTitleTextStyle = {
    color,
    fontSize: 18,
    fontWeight: "bold",
  };

  let iconType = props.isFav ? "star" : "star-outline";

  const dispatch = useDispatch();

  return (
    <View style={styles.foodListView}>
      <View style={styles.textView}>
        <Text style={footTitleTextStyle}>{props.title}</Text>
      </View>
      <View style={styles.favButton}>
        <TouchableOpacity onPress={() => dispatch(toggleFavorite(props.id))}>
          <Ionicons name={iconType} size={22} color={color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodListView: {
    paddingTop: 7,
    flexDirection: "row",
    justifyContent: "center",
  },
  textView: {
    alignSelf:"center"
  },
  favButton: {
    paddingLeft: 14,
  },
  foodTitleText: {},
});

export default TodayListItem;
