import { View, StyleSheet } from 'react-native';
import PrimaryButton from '../ui/PrimaryButton';


export default function StartGuessing(props) {

  const gameReset = () => {
    props.onPickedNumber(null);
    props.setScreen('StartGameScreen');
  }

  return(
    <View style={styles.buttonContainer}>
      <PrimaryButton
        title="Start Guessing"
        onPress={props.handleUserGuess.bind(this, "null")}
      />
      <View style={styles.space} />
      <PrimaryButton
        title="Reset"
        onPress={gameReset}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',

  },
  space: {
    marginRight: 10,
  }
});
