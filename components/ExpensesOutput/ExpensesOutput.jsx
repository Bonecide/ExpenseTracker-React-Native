import { View, StyleSheet, Text } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { colors } from "./../../constants/colors";

export default function ExpensesOutput({ expenses, periodName }) {
  if (expenses.length) {
    return (
      <View style={s.container}>
        <ExpensesSummary expenses={expenses} periodName={periodName} />
        <ExpensesList expenses={expenses} />
      </View>
    );
  } else {
    return (
      <View style={s.container}>
        <Text style={s.alertText}>There is no expenses {'=('}</Text>
      </View>
    );
  }
}
const s = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.primary700,
    flex: 1,
  },
  alertText : {
    fontSize : 16,
    color : 'white',
    textAlign: 'center',
    fontWeight : 'bold'
  }
});
