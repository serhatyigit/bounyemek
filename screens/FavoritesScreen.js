import React, { useLayoutEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import AllListItem from "../components/AllListItem";

import HeaderButton from "../components/HeaderButton";

const FavoritesScreen = ({ navigation }) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Favoriler",
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

  const favoritesListRenderItem = ({ item }) => (
    <AllListItem id={item.id} title={item.title} isFav={item.isFav} />
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emptyWarningText}>Favori Listeniz Boş!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={favoriteMeals}
        renderItem={favoritesListRenderItem}
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
  emptyWarningText: {
    fontSize: 20,
    color: "#00bfff",
    fontWeight: "600",
  },
});

export default FavoritesScreen;
