import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const InfoScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Hakkında",
      headerBackTitleStyle: {
        fontSize: 14,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <Image
        style={styles.bounLogo}
        source={require("../assets/bounlogo.png")}
      />
      <Text style={styles.detailText}>
        Bu uygulama Boğaziçi Üniversitesi Yönetim Bilişim Sistemleri bölümü
        öğrencisi Serhat Yiğit tarafından MIS 492 dersi için bitirme projesi
        olarak yapılmıştır.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  detailText: {
    margin: 20,
    fontSize: 20,
    color: "#00bfff",
    fontWeight: "600",
  },
});

export default InfoScreen;
