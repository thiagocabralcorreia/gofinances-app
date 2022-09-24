import React from "react";

import { categories } from "../../utils/categories";

import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

export interface CategoryProps {
  key: string;
  name: string;
  icon?: string | null;
}

interface Props {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeList: () => void;
}

export const CategoryList = ({ category, setCategory, closeList }: Props) => {
  function handleCategoryList(category: CategoryProps) {
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Category</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategoryList(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        style={{ flex: 1, width: "100%" }}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title={"Select"} onPress={closeList} />
      </Footer>
    </Container>
  );
};
