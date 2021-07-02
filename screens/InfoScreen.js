import React, { useLayoutEffect, useState } from "react";
import { Button, Image, Keyboard, Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const InfoScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Hakkında",
      headerTintColor: "#00bfff",
      headerBackTitleStyle: {
        fontSize: 14,
      },
    });
  }, [navigation]);

  const [emailText, setemailText] = useState("");

  const Info = () => {
    return (
      <View>
        <View>
          <Image style={styles.bounLogo} source={require("../assets/bounlogo.png")} />
        </View>
        <View>
          <Text style={styles.detailText}>
            Bu uygulama Serhat Yiğit ve Selim Kamacihan tarafından MIS 492 dersi için bitirme projesi olarak
            yapılmıştır.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Pressable onPress={Keyboard.dismiss}>
        <Image style={styles.bounLogo} source={require("../assets/bounlogo.png")} />
        <Text style={styles.detailText}>
          Bu uygulama Serhat Yiğit ve Selim Kamacıhan tarafından MIS 492 dersi için bitirme projesi olarak
          yapılmıştır.
        </Text>
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Uygulama ve yemekhane hakkındaki görüş ve tavsiyelerinizi mail aracılığıyla iletebilirsiniz"
        onChangeText={(text) => setemailText(text)}
        defaultValue={emailText}
        autoCorrect={false}
        placeholderTextColor={"#00bfff"}
        multiline={true}
      />
      <Button
        color="#00bfff"
        onPress={() => Linking.openURL(`mailto:serhatyigitt@icloud.com?subject=Boun Dining Hall App. Hakkında &body=${emailText}\n\n Boğaziçi Üniversitesi Yemekhane Uygulaması üzerinden gönderildi. `)}
        title="Gönder"
      />
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
    fontSize: 17,
    color: "#00bfff",
    fontWeight: "600",
  },
  bounLogo: {
    height: 80,
    width: 80,
    alignSelf: "center",
  },
  input: {
    height: "45%",
    margin: 12,
    width: "80%",
    borderWidth: 2,
    borderColor: "#00bfff",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    fontSize: 16,
    color: "#00bfff",
    fontWeight: "400",
  },
});

export default InfoScreen;
