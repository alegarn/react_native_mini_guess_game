import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { View, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import Colors from './constants/colors';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import EndGameScreen from './screens/EndGameScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [userNumber, setUserNumber] = useState(null);
  const [screen, setScreen] = useState('StartGameScreen');
  const [attemptGuess, setAttemptGuess] = useState('1');

  const [fontsLoaded] = useFonts({
    'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf')
  });

  /* https://docs.expo.dev/versions/latest/sdk/font/ */

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function pickNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
  }


  const gameResetHandler = () => {
    setUserNumber(null);
    setAttemptGuess('1');
    setScreen('StartGameScreen');
  }


  let currentScreen = null;

  screen === 'StartGameScreen' ? ( currentScreen =
    <StartGameScreen setScreen={setScreen} onPickedNumber={setUserNumber} />
  ) : screen === 'GameScreen' ? ( currentScreen =
    <GameScreen
      userNumber={userNumber}
      setScreen={setScreen}
      attemptGuess={attemptGuess}
      setAttemptGuess={setAttemptGuess}
      onPickedNumber={pickNumberHandler} />
  ) : ( currentScreen =
    <EndGameScreen
      userNumber={userNumber}
      attemptGuess={attemptGuess}
      setUserNumber={setUserNumber}
      gameResetHandler={gameResetHandler}
    />
  )

  return (
    <View style={styles.screenContainer} onLayout={onLayoutRootView}>
      <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.screenContainer}>
        <ImageBackground
          source={require('./assets/background.png')}
          style={styles.screenContainer}
          imageStyle={styles.backgroundImage}
          resizeMode='cover'
        >
          <StatusBar style="dark" />
          <SafeAreaView style={styles.screenContainer}>
            {currentScreen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.5,
  }
});
