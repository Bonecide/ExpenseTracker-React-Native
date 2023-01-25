import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import { colors } from "../constants/colors";
import { ExpensesContext } from "./../store/expenses-context";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import { deleteExpense, storeExpense } from "../util/http";
import { updateExpense } from './../util/http';
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({ route }) {
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState()
  const expensesCtx = useContext(ExpensesContext);
  const navigation = useNavigation();
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);
  const deleteExpenseHandler = async () => {
    setIsLoading(true)
    try {
      await deleteExpense(expenseId)
      expensesCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (e) {
      setError('Apparently smth is wrong with delete =(')
    }
    
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      setIsLoading(true)
      try {
        expensesCtx.updateExpense(expenseId, {
          description: expenseData.description,
          amount: expenseData.amount,
          date: expenseData.date,
        });
        await updateExpense(expenseId,expenseData)
        navigation.goBack();
      } catch (e) {
        setError('Apperatntly smth is wrong with editing =(')
      }
    } else {
      setIsLoading(true)
      try {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({
        id : id,
        description: expenseData.description,
        amount: expenseData.amount,
        date: expenseData.date,
        
      })
      navigation.goBack();
      } catch (e) {
        setError('Apperatntly smth is wrong with adding =(')
      }
    }
    
  };
  if (error) {
    return <ErrorOverlay message={error} onConfirm={() => setError(false)}/>
  }
  if (isLoading) {
    return <LoadingOverlay/>
  }
  return (
    <View style={s.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Confirm Change" : "Add Expense"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues = {selectedExpense}
      />

      {isEditing && (
        <View style={s.deleteContainer}>
          <IconButton
            onPress={deleteExpenseHandler}
            icon={"trash"}
            color={colors.error500}
            size={36}
          />
        </View>
      )}
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    alignItems: "center",
  },
});
