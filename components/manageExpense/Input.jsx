import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../constants/colors";

export default function Input({label,invalid,...props}) {

    return(
        <View style={s.inputContainer}>
            <Text style={[s.label,invalid && s.invalidLabel]}>{label}</Text>
            <TextInput style={[s.input, invalid && s.invalidInput]} {...props}/>
        </View>
    )
}
const s = StyleSheet.create({
    inputContainer : {
        marginHorizontal : 4,
        marginVertical : 8,
    },
    label : {
        fontSize : 12,
        color : colors.primary100,
        marginBottom : 4,

    },
    input : {
        backgroundColor : colors.primary100,
        padding : 6,
        borderRadius : 6,
        fontSize : 18,
        color : colors.primary700,

    },
    invalidLabel : {
        color : colors.error500
    },
    invalidInput : {
        borderWidth : 2,
        borderColor : colors.error500
    }
})