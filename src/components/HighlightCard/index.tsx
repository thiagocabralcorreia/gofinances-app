import React from "react";
import {
  Container,
  Title,
  Header,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface HighlightCardProps {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

export const HighlightCard = ({
  title,
  amount,
  lastTransaction,
  type,
}: HighlightCardProps) => {
  const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign",
  };

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
};
