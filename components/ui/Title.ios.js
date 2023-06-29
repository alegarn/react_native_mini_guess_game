import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
export default function Title(props) {
  return (
    <Text style={styles.title}>{props.title}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.secondary,
    fontFamily: 'montserrat-bold',
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
  },
});
