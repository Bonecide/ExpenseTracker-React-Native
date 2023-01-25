import { Text, View, Pressable, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export default function Button({ children, onPress, mode,style }) {
  return (
    <View style={style}>
      <Pressable style={({pressed}) => pressed && s.pressed} onPress={onPress}>
        <View style={[s.button, mode === "flat" && s.flat]}>
          <Text style={[s.buttonText, mode === "flat" && s.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: colors.primary100,
    borderRadius: 4,
  },
});
