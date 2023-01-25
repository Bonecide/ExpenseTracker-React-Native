import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "./../store/expenses-context";
import { getDateMinusDays } from "./../util/date";
import { useEffect } from "react";
import { useState } from "react";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError,setIsError] = useState( )
  const ExpensesCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpensesFromBack() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        ExpensesCtx.setExpenses(expenses);
      } catch (e) {
        setIsError('Could not fetch expenses!')
      }
      setIsLoading(false);
      
    }
    getExpensesFromBack();
  }, []);
  if(isError) {
    return <ErrorOverlay onConfirm={() => setIsError(false)} message={isError}/>
  }
  if (isLoading) {
    return <LoadingOverlay/>
  }
  const recentExpenses = ExpensesCtx.expenses.filter((expenses) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expenses.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput expenses={recentExpenses} periodName={"Last 7 Days"} />
  );
}
