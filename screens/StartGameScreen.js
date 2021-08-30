import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";
import Input from "../components/Input";
import MyButton from "../components/MyButton";

const StartGameScreen = (props) => {
  const [enteredValue, setenteredValue] = useState("");
  const [userConfirmed, setuserConfirmed] = useState(false);
  const [selectedNumber, setselectedNumber] = useState();
  const numberInputHandler = (inputText) => {
    setenteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setenteredValue("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number has to be between 1 and 99", [
        {
          text: "Ok",
          style: "destructive",
          onPress: resetInputHandler,
        },
      ]);
    }
    setuserConfirmed(true);
    setselectedNumber(parseInt(enteredValue));
    setenteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (userConfirmed) {
    confirmedOutput = (
      <Card style={styles.summarycontainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MyButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MyButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}>Let's Play !</TitleText>
        <Card style={styles.inputcontainer}>
          <BodyText>Enter a number</BodyText>
          <Input
            style={styles.input}
            blurOnSubit
            autoCapitalize="none"
            autocorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttoncontainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={colors.secondary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    color: "brown",
    marginVertical: 60,
  },
  inputcontainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttoncontainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  text: {
    textAlign: "center",
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summarycontainer: {
    marginTop: 30,
    alignItems: "center",
  },
});

export default StartGameScreen;
