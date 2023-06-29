import { useState } from 'react';
import { View, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

const StartGameScreen = (props) => {

  const [enteredNumber, setEnteredNumber] = useState('');

  const handleInputChange = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  const resetInputHandler = () => {
    setEnteredNumber('');
  }
  const handlePressStartGame = () => {
    const number = parseInt(enteredNumber, 10); // Convert the input to an integer
    if (Number.isNaN(number) || number <= 0 || number > 99) {
      // Check if the input is not a number or is a negative number
      Alert.alert(
        "Invalid input.",
        'Please enter a positive number between 1 and 99.',
        [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }],
      );
      return;
    }
    props.onPickedNumber(`${number}`);
    props.setScreen('GameScreen');
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView style={styles.screenContainer} behavior={Platform.select({ios: 'padding', android: null})}>
        <ScrollView contentContainerStyle={styles.screenContainer}>
          <View style={styles.titleContainer}>
            <Title title="Choose a Number" />
            <View style={styles.centerContainer}>
              <TextInput
                keyboardType="number-pad"
                value={enteredNumber}
                onChangeText={handleInputChange}
                style={styles.numberInput}
                maxLength={2}
                autoCorrect={false}
                autoCapitalize='none'
              />
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonView}>
                  <PrimaryButton
                    title="Start"
                    onPress={handlePressStartGame}
                  />
                </View>
                <View style={styles.buttonView}>
                  <PrimaryButton
                    title="Reset"
                    onPress={resetInputHandler}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    padding: 30,
    marginHorizontal: 30,
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 10,
    backgroundColor: Colors.tertiary,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: Colors.secondary,
    marginVertical: 15,
    textAlign: 'center',
    fontFamily: 'montserrat',
    fontSize: 24,
    color: Colors.secondary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    columnGap: 10,
  },
  buttonView: {
    flex: 1,
  },

});

export default StartGameScreen;
