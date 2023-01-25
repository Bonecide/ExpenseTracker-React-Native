import { Text, View, StyleSheet } from "react-native";
import { colors } from "./../../constants/colors";

export default function ExpensesSummary({ periodName, expenses }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={s.container}>
      <Text style={s.period}>{periodName}</Text>
      <Text style={s.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary500,
  },
});
