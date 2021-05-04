import React, { useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import AllListItem from "../components/AllListItem";

import HeaderButton from "../components/HeaderButton";

const AllListScreen = ({ navigation }) => {
  const allList = useSelector((state) => state.meals.allMeals);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Bütün Liste",
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

  const allListRenderItem = ({ item }) => (
    <AllListItem id={item.id} title={item.title} isFav={item.isFav} />
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={allList}
        renderItem={allListRenderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
});

export default AllListScreen;
