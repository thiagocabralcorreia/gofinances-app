import React from "react";
import {
  Container,
  Category,
  Icon,
  CategorySelected,
  IconFeather,
} from "./styles";

interface CategorySelectButtonProps {
  title: string;
  icon?: string | null;
  onPress: () => void;
}

export const CategorySelectButton = ({
  title,
  icon,
  onPress,
}: CategorySelectButtonProps) => {
  return (
    <Container onPress={onPress}>
      <CategorySelected>
        {icon && <IconFeather name={icon} />}
        <Category>{title}</Category>
      </CategorySelected>
      <Icon name={"keyboard-arrow-down"} />
    </Container>
  );
};
