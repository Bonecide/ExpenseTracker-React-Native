import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "./../store/expenses-context";

export default function AllExpenses() {
  const ExpensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput expenses={ExpensesCtx.expenses} periodName={"total"} />
  );
}
