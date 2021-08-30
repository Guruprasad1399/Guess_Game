import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";
import Card from "../components/Card";

const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText style={styles.title}>The Game is Over !</TitleText>
      <View style={styles.imagecontainer}>
        <Image
          fadeDuration={1000}
          source={require("../assets/success.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Card style={styles.cardresult}>
        <BodyText style={styles.body}>
          Number of rounds:{" "}
          <Text style={styles.highlight}>{props.roundsnumber}</Text>
        </BodyText>
        <BodyText style={styles.result}>
          The Number you entered was :{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
        <Button title="New Game" onPress={props.onRestart}></Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagecontainer: {
    borderRadius: 150,
    width: 300,
    height: 300,
    borderColor: "black",
    borderWidth: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  result: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 20,
  },
  highlight: {
    color: colors.primary,
  },
  title: {
    marginBottom: 20,
  },
  body: {
    marginVertical: 20,
  },
  cardresult: {
    marginTop: 15,
  },
});

export default GameOver;
