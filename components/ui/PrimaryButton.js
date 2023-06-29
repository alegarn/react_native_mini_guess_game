import { Pressable, Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/colors';

const PrimaryButton = ({ title, onPress }) => {

  function pressHandler() {
    onPress();
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({pressed}) => pressed ? [styles.pressed, styles.button] : styles.button}
        onPress={pressHandler}
        android_ripple={{ color: '#b4ab04' }}
      >
        {title === "+" ?
          <AntDesign name="plus" size={24} color={Colors.tertiary} /> :
        title === "-" ?
          <AntDesign name="minus" size={24} color={Colors.tertiary} /> :
        <Text style={styles.buttonText}>{title}</Text>
        }
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 30,
    overflow: 'hidden',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.tertiary,
    fontFamily: 'montserrat-bold',
    fontSize: 16,
    flexWrap: 'nowrap',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
