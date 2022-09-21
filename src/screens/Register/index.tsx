import React, { useState } from "react";
import { Modal } from "react-native";

import { Input } from "../../components/Form/Input";
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

  return (
    <Container>
      <Header>
        <Title>Register</Title>
      </Header>

      <Form>
        <TopFormContent>
          <Input placeholder={"Name"} />
          <Input placeholder={"Price"} />

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

        <Button title="Sent" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategoryList
          category={category}
          setCategory={setCategory}
          closeList={handleCloseCategoryListModal}
        />
      </Modal>
    </Container>
  );
};
