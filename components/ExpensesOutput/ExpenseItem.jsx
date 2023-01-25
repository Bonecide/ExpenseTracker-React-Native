import { Pressable, View, StyleSheet, Text } from "react-native";
import { colors } from "./../../constants/colors";
import { useNavigation } from "@react-navigation/native";
export default function ExpenseItem({ item }) {
  const navigation = useNavigation();

  const ExpensePressHandler = () => {
    navigation.navigate("ManageExpense",{
      expenseId : item.id
    });
  };
  return (
    <Pressable
      onPress={ExpensePressHandler}
      style={({ pressed }) => pressed && s.pressed}
    >
      <View style={s.expenseItem}>
        <View>
          <Text style={[s.textBase, s.description]}>{item.description}</Text>
          <Text style={s.textBase}>{item.date.toLocaleDateString()}</Text>
        </View>
        <View style={s.priceContainer}>
          <Text style={s.price}>${item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const s = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  price: {
    color: colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.6,
  },
});
