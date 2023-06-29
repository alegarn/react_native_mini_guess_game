import { View, Text, Image, StyleSheet, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from '../constants/colors';
import Title from '../components/ui/Title';

export default function EndGameScreen(props) {
  const attemptGuess = props.attemptGuess;

  const { width, height } = useWindowDimensions();

  function gameReset() {
    props.gameResetHandler();
  }

  let imageSize = 300;

  if (width < 400) {
    imageSize = 200;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    margin: height < 400 ? 20 : 30,
  }


  return(
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Title title="Game Over" />
          <View style={[styles.imageContainer, imageStyle ]}>
            <Image style={styles.image} source={require('../assets/images/success-image.jpeg')} />
          </View>
          <Text style={styles.chosenNumber}> It was <Text style={styles.bold}>{props.userNumber}</Text> !</Text>
          <Text style={styles.attemptGuess}>Number of attempt: <Text style={styles.bold}>{`${attemptGuess}`}</Text></Text>
          <PrimaryButton title="Reset" onPress={gameReset} />
        </View>
      </View>
    </ScrollView>
  );
}
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  imageContainer: {
    width: width < 280 ? 100 : 200,
    height: width < 280 ? 100 : 200,
    borderRadius: width < 280 ? 50 : 100,
    borderWidth: 3,
    overflow: 'hidden',
    borderColor: Colors.secondary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  chosenNumber: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'montserrat',
  },
  bold: {
    fontFamily: 'montserrat-bold',
    color: Colors.quaternary,
    fontSize: 24,
  },
  attemptGuess: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'montserrat',
    fontSize: 20
  }
})
