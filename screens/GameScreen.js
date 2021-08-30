import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndnum = Math.floor(Math.random() * (max - min)) + min;
  if (rndnum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndnum;
  }
};

const renderListItem = (value, numofround) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numofround}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, SetcurrentGuess] = useState(initialGuess);

  const [PastGuess, setPastGuess] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(PastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "Smaller" && currentGuess < props.userChoice) ||
      (direction === "Greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("You are cheating", "That's a wrong hint!", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "Smaller") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    SetcurrentGuess(nextNumber);
    // setrounds((curRounds) => curRounds + 1);
    setPastGuess((curPastguess) => [nextNumber, ...curPastguess]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttoncontainer}>
        <Button
          title="Smaller"
          onPress={nextGuessHandler.bind(this, "Smaller")}
        ></Button>
        <Button
          title="Greater"
          onPress={nextGuessHandler.bind(this, "Greater")}
        ></Button>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {PastGuess.map((guess, index) =>
            renderListItem(guess, PastGuess.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  list: {
    flex: 1,
    width: "80%",
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    borderWidth: 2,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 150,
  },
});

export default GameScreen;
