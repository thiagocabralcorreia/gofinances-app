import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategoryList, CategoryProps } from "../CategoryList";

import {
  Container,
  Title,
  Header,
  Form,
  TopFormContent,
  TransactionsTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState<CategoryProps>({
    key: "category",
    name: "Category",
    icon: null,
  });

  function handleOpenCategoryListModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseCategoryListModal() {
    setCategoryModalOpen(false);
  }

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    amount: Yup.number()
      .typeError("Enter the numeric value")
      .positive("Value cannot be negative")
      .required("Required value"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = (form: FormData) => {
    if (!transactionType)
      return Alert.alert("Required transaction", "Select transaction type", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    if (category.key === "category")
      return Alert.alert("Required category", "Select category");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Register</Title>
        </Header>

        <Form>
          <TopFormContent>
            <InputForm
              control={control}
              name={"name"}
              placeholder={"Name"}
              autoCapitalize={"sentences"}
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name={"amount"}
              placeholder={"Price"}
              keyboardType={"numeric"}
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title={"Entrada"}
                type={"up"}
                onPress={() => handleTransactionTypeSelect("up")}
                isActive={transactionType === "up"}
              />
              <TransactionTypeButton
                title={"Saída"}
                type={"down"}
                onPress={() => handleTransactionTypeSelect("down")}
                isActive={transactionType === "down"}
              />
            </TransactionsTypes>

            <CategorySelectButton
              icon={category.icon}
              onPress={handleOpenCategoryListModal}
              title={category.name}
            />
          </TopFormContent>

          <Button title="Sent" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategoryList
            category={category}
            setCategory={setCategory}
            closeList={handleCloseCategoryListModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
