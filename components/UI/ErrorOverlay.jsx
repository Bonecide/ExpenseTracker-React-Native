import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import Button from './Button';

export default function ErrorOverlay({message,onConfirm}) {
  return (
    <View style={s.container}>
      <Text style={[s.text,s.title]}>An Error occured!</Text>
      <Text style={s.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const s = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 24,
        backgroundColor : colors.primary700
    },
    text : {
        color : 'white',
        alignItems : 'center',
        marginBottom : 8,

    },
    title : {
        fontSize : 20,
        fontWeight : 'bold'
    }
});
