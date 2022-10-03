import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import uuid from "react-native-uuid";

import { dateFormatter } from "../../utils/formatters";
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

  const navigation = useNavigation();
  const dataKey = "@gofinances:transactions";

  function handleOpenCategoryListModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseCategoryListModal() {
    setCategoryModalOpen(false);
  }

  function handleTransactionTypeSelect(type: "positive" | "negative") {
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (form: FormData) => {
    if (!transactionType)
      return Alert.alert("Required transaction", "Select transaction type");
    if (category.key === "category")
      return Alert.alert("Required category", "Select category");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: dateFormatter(new Date()),
    };
    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const formattedData = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Category",
        icon: null,
      });

      navigation.navigate("List");
    } catch (e) {
      console.log(e);
      Alert.alert("Failed: unable to register information.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    };

    loadData();

    // Remove collection:
    // async function removeAll() {
    //   AsyncStorage.removeItem(dataKey);
    // }
    // removeAll();
  }, []);

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
                title={"Inflow"}
                type={"up"}
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                title={"Outflow"}
                type={"down"}
                onPress={() => handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
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
