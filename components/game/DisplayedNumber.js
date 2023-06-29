import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PrimaryButton from '../ui/PrimaryButton';

const deviceWidth = Dimensions.get('window').width;

export default function DisplayedNumber(props) {

  const portrait = (
    <>
      {props.number !== null ? (<Text style={styles.chosenNumber}>The number is {props.number}</Text>) : null}
      <View style={styles.buttonContainer}>
        <PrimaryButton
            title="-"
            onPress={props.handleMinusGuess} />
        <View style={styles.space} />
        <PrimaryButton
          title="+"
          onPress={props.handlePlusGuess} />
      </View>
    </>
  )

  const landscape = (
    <>
      <View style={styles.buttonContainer}>
        <PrimaryButton
            title="+"
            onPress={props.handlePlusGuess} />
        {props.number !== null ? (<Text style={styles.chosenNumber}>{props.number}</Text>) : null}
        <PrimaryButton
            title="-"
            onPress={props.handleMinusGuess}
          />
      </View>
    </>
  )


  const screen = props.isLandscape ? landscape : portrait;


  return(
    screen
  )
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: deviceWidth < 500 ? 10 : 0,
    justifyContent: 'center',
    alignItems: deviceWidth < 500 ? null : 'center',
  },
  space: {
    marginRight: 30,
  },
  chosenNumber: {
    fontFamily: 'montserrat-bold',
    fontSize: 24,
    textAlign: 'center',
    padding: deviceWidth < 500 ? 10 : 0,
    borderWidth: deviceWidth < 500 ? 2 : 0,
    borderColor: '#fff',
    marginHorizontal: 30,
  }
});
