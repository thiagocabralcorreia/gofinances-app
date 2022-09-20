import React, { useState } from "react";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

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
        </TopFormContent>
        <Button title="Sent" />
      </Form>
    </Container>
  );
};
