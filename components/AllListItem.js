import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";

const AllListItem = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.foodListView}>
      <View style={styles.textView}>
        <Text style={styles.footTitleTextStyle}>{props.title}</Text>
      </View>
      <View style={styles.favButton}>
        <TouchableOpacity onPress={() => dispatch(toggleFavorite(props.id))}>
          <Ionicons
            name={props.isFav ? "star" : "star-outline"}
            size={25}
            color={"#00bfff"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodListView: {
    width: 280,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: "#00bfff",
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
  },
  textView: {
    alignSelf: "center",
  },
  favButton: {
    paddingLeft: 12,
    justifyContent: "center",
  },
  footTitleTextStyle: {
    color: "#00bfff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AllListItem;
