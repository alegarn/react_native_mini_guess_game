import { View, StyleSheet, Alert, FlatList, Text, Dimensions, useWindowDimensions, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import DisplayedNumber from '../components/game/DisplayedNumber';
import Title from '../components/ui/Title';
import { Colors } from 'react-native/Libraries/NewAppScreen';


let lowerLimit = 1;
let upperLimit = 99;
const deviceWidth = Dimensions.get('window').width;



const GameScreen = (props) => {
  const userNumber = parseInt(props.userNumber, 10);
  const initialGuess = randomNumberGuess(1, 99, userNumber);
  const [chosenNumber, setChosenNumber] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const guessRoundListLength = guessRounds.length;

  const { width, height } = useWindowDimensions();
  const isLandscape = width > 500;

  const paddingDistance = width < 280 ? 10 : 30;


  function randomNumberGuess(lowerLimit, upperLimit, chosenNumber) {
    const guess = Math.floor(Math.random() * (upperLimit - lowerLimit + 1) + lowerLimit);
    if (guess === chosenNumber) {
      return randomNumberGuess(lowerLimit, upperLimit, chosenNumber);
    } else {
      return guess;
    }
  };

  const handlePlusGuess = () => {
    handleUserGuess("greater");
  }

  const handleMinusGuess = () => {
    handleUserGuess("lower");
  }
  const handleUserGuess = (direction) => {

    if ( (userNumber > chosenNumber && direction === "lower") || (userNumber < chosenNumber && direction === "greater")) {
      Alert.alert(
        "Dont lie!",
        'Show the tip',
        [{text: 'Ok', style: 'destructive'}]
      )
      return;
    } else {

      if ( userNumber > chosenNumber && direction === "greater") {
        lowerLimit = chosenNumber;
      }

      if ( userNumber < chosenNumber && direction === "lower") {
        upperLimit = chosenNumber + 1;
      }

      const newGuess = randomNumberGuess(lowerLimit, upperLimit, chosenNumber)
      setChosenNumber(newGuess);
      setGuessRounds([newGuess, ...guessRounds]);
      console.log(guessRounds);

      props.setAttemptGuess(parseInt(props.attemptGuess) + 1);

      if (newGuess === userNumber) {
        Alert.alert(
          "You Won!",
          `You guessed the number! It was ${userNumber} ! Try again ?`,
          [{text: "Yes", style: 'destructive', onPress: props.setScreen('EndGameScreen')}]
        )
      }

    }
  };

  const screenLandscape = (
    <View style={styles.titleContainer}>
      <Title title={`Your Number is ${userNumber}`} />
      <DisplayedNumber
        number={chosenNumber}
        handlePlusGuess={handlePlusGuess}
        handleMinusGuess={handleMinusGuess}
        isLandscape={isLandscape}
        />
    </View>
  );

  const screenPortrait = (
    <View style={styles.titleContainer}>
      <Title title={`Your Number is ${userNumber}`} />
      <DisplayedNumber
        number={chosenNumber}
        handlePlusGuess={handlePlusGuess}
        handleMinusGuess={handleMinusGuess}
        isLandscape={isLandscape}
      />
    </View>
  );

  const screen = isLandscape ? screenLandscape : screenPortrait;


  return (
      <KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding">
        <View style={[styles.screenContainer, { padding: paddingDistance }]}>
          {screen}
          <FlatList
            style={styles.textContainer}
            data={guessRounds}
            keyExtractor={(item, index) => index}
            renderItem={(itemData) => {
              return <Text style={styles.rounds}>Round {guessRoundListLength - itemData.index}: <Text style={styles.chosenNumbers}>{itemData.item}</Text></Text>
          }} />
        </View>
      </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  titleContainer: {
    padding: deviceWidth < 280 ? null : 20,
    paddingHorizontal: deviceWidth < 280 ? 10 : 20,
    marginTop: (deviceWidth < 280 ? 20 : 30),
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    textAlign: 'center',
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
  },
  rounds: {
    fontFamily: 'montserrat',
    fontSize: 24,
  },
  chosenNumbers: {
    color: Colors.secondary,
    fontFamily: 'montserrat-bold',
    fontSize: 24,
  }

});

export default GameScreen;

  /* 1  attemptGuess = 0, lowerLimit = 0 , upperLimit = 99 */
  /* 1  fct randomNumberGuess: lowerLimit <= guessedNumber <= upperLimit */
    /* 2  guessedNumber = Math.floor(Math.random() * (upperLimit - lowerLimit + 1) + lowerLimit); */
  /* 1  comparaison: if guessedNumber == userNumber */
    /* 2 end game */
  /* 1  if userNumber > choix */
    /* 2 component tip, press + (alert if user press - )*/
    /* 2 state setLowerLimit(choix) */
    /* 2 setAttemptGuess(attemptGuess + 1) */
    /* 2 choix d'un nombre aléatoire */
  /* 1 if userNumber < choix */
    /* 2 component tip, press - (alert if user press + )*/
    /* 2 state setUpperLimit(choix) */
    /* 2 setAttemptGuess(attemptGuess + 1) */
    /* 2 choix d'un nombre aléatoire */
