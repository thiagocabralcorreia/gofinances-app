import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  Photo,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  SubHeader,
  TrashButton,
  TrashIcon,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  entries: HighLightProps;
  expensive: HighLightProps;
  total: HighLightProps;
}

export const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Mobile development",
      amount: "£ 7,000.00",
      category: { name: "Salary", icon: "dollar-sign" },
      date: "13/08/2021",
    },
    {
      id: "2",
      type: "negative",
      title: "Bebop Burger",
      amount: "£ 12.00",
      category: { name: "Food", icon: "coffee" },
      date: "10/08/2021",
    },
    {
      id: "3",
      type: "negative",
      title: "Apartment rent",
      amount: "£ 1,110.00",
      category: { name: "Home", icon: "home" },
      date: "28/08/2021",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/74374833?v=4",
              }}
            />
            <User>
              <UserGreeting>Hi, </UserGreeting>
              <UserName>Thiago</UserName>
            </User>
          </UserInfo>
          <LogoutButton>
            <Icon name={"power"} />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type={"up"}
          title={"Inflows"}
          amount={"£ 00.00"}
          lastTransaction={"Last cash inflow on April 13th"}
        />
        <HighlightCard
          type={"down"}
          title={"Outflows"}
          amount={"£ 00.00"}
          lastTransaction={"Last cash outflow on April 13th"}
        />
        <HighlightCard
          type={"total"}
          title={"Total"}
          amount={"£ 00.00"}
          lastTransaction={"1st to 13th of April"}
        />
      </HighlightCards>
      <Transactions>
        <SubHeader>
          <Title>List</Title>
          {data.length > 0 && (
            <TrashButton
            // onPress={handleClearTransactions}
            >
              <TrashIcon name={"trash"} />
            </TrashButton>
          )}
        </SubHeader>

        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
