import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import mealsReducer from "./store/reducers/meals";

import DailyListScreen from "./screens/DailyListScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AllListScreen from "./screens/AllListScreen";
import SettingsScreen from "./screens/SettingsScreen";
import InfoScreen from "./screens/InfoScreen";
import TimesScreen from "./screens/TimesScreen";

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

const TodayListStack = createStackNavigator();

const TodayListStackScreen = () => (
  <TodayListStack.Navigator>
    <TodayListStack.Screen name="TodayList" component={DailyListScreen} />
    <TodayListStack.Screen name="SettingsScreen" component={SettingsScreen} />
    <TodayListStack.Screen name="InfoScreen" component={InfoScreen} />
  </TodayListStack.Navigator>
);

const FavoritesStack = createStackNavigator();

const FavoritesStackScreen = () => (
  <FavoritesStack.Navigator>
    <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
    <FavoritesStack.Screen name="SettingsScreen" component={SettingsScreen} />
    <FavoritesStack.Screen name="InfoScreen" component={InfoScreen} />
  </FavoritesStack.Navigator>
);

const AllListStack = createStackNavigator();

const AllListStackScreen = () => (
  <AllListStack.Navigator>
    <AllListStack.Screen name="AllList" component={AllListScreen} />
    <AllListStack.Screen name="SettingsScreen" component={SettingsScreen} />
    <AllListStack.Screen name="InfoScreen" component={InfoScreen} />
  </AllListStack.Navigator>
);

const TimesStack = createStackNavigator();

const TimesStackScreen = () => (
  <TimesStack.Navigator>
    <TimesStack.Screen name="Times" component={TimesScreen} />
    <TimesStack.Screen name="SettingsScreen" component={SettingsScreen} />
    <TimesStack.Screen name="InfoScreen" component={InfoScreen} />
  </TimesStack.Navigator>
);

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={screenOptions}
          tabBarOptions={tabBarOptions}
        >
          <Tab.Screen name="Günlük Liste" component={TodayListStackScreen} />
          <Tab.Screen name="Favoriler" component={FavoritesStackScreen} />
          <Tab.Screen name="Bütün Liste" component={AllListStackScreen} />
          <Tab.Screen name="Yemek Saatleri" component={TimesStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const tabBarOptions = {
  labelStyle: {
    fontSize: 13,
    paddingBottom: 3,
  },
};

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color }) => {
    let iconName;

    switch (route.name) {
      case "Günlük Liste":
        iconName = focused ? "ios-today" : "ios-today-outline";
        break;
      case "Favoriler":
        iconName = focused ? "ios-star" : "ios-star-outline";
        break;
      case "Bütün Liste":
        iconName = "ios-list";
        break;
      case "Yemek Saatleri":
        iconName = "md-time";
    }

    return <Ionicons name={iconName} size={27} color={color} />;
  },
});

export default App;
