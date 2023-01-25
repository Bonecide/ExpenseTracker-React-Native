import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "./../UI/Button";
import { colors } from "../../constants/colors";

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
    
  const [inputs, setInputs] = useState({
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
  });

  function submitHandler() {
    console.log(new Date(inputs.date.value));
    const expenseData = {
      amount: parseInt(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    console.log(amountIsValid, dateIsValid, descriptionIsValid);
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: amountIsValid },
          date: { value: prev.date.value, isValid: dateIsValid },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View>
      <Input
        invalid={!inputs.amount.isValid}
        label={"Amount"}
        keyboardType="decimal-pad"
        onChangeText={(enteredText) =>
          setInputs((prev) => {
            return {
              ...prev,
              amount: { value: enteredText, isValid: true },
            };
          })
        }
        value={inputs.amount.value}
      />
      <Input
        invalid={!inputs.date.isValid}
        label={"Date"}
        placeholder="YYYY-MM-DD"
        maxLength={10}
        onChangeText={(enteredText) =>
          setInputs((prev) => {
            return {
              ...prev,
              date: { value: enteredText, isValid: true },
            };
          })
        }
        value={inputs.date.value}
      />
      <Input
        invalid={!inputs.description.isValid}
        label={"Description"}
        multiline={true}
        autoCorrect={false}
        onChangeText={(enteredText) =>
          setInputs((prev) => {
            return {
              ...prev,
              description: { value: enteredText, isValid: true },
            };
          })
        }
        value={inputs.description.value}
      />
      {formIsInvalid && (
        <Text style={s.errorText}>
          Invalid input values - please check your entered data
        </Text>
      )}
      <View style={s.buttons}>
        <Button style={s.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={s.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: colors.error500,
    margin: 8,
  },
});
