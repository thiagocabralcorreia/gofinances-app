import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { currencyFormatter, dateFormatter } from "../../utils/formatters";
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
  LoadingContainer,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface IHighlightData {
  inflows: HighlightProps;
  outflows: HighlightProps;
  totalBalance: HighlightProps;
}

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState({} as IHighlightData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const theme = useTheme();

  const getLastFlowDate = (
    collection: DataListProps[],
    type: "positive" | "negative"
  ) => {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.toLocaleString("en-GB", {
      month: "long",
    })} ${lastTransaction.getDate()}`;
  };

  const loadTransactions = async () => {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let totalInflows = 0;
    let totalOutflows = 0;

    const formattedTransactions: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          totalInflows += Number(item.amount);
        } else {
          totalOutflows += Number(item.amount);
        }

        const amount = currencyFormatter(Number(item.amount));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: item.date,
        };
      }
    );

    setTransactions(formattedTransactions);

    const lastInflows = getLastFlowDate(transactions, "positive");
    const lastOutflows = getLastFlowDate(transactions, "negative");
    const totalInterval = `${
      lastInflows >= lastOutflows ? lastInflows : lastOutflows
    }`;

    const totalBalance = totalInflows - totalOutflows;

    setHighlightData({
      inflows: {
        amount: currencyFormatter(totalInflows),
        lastTransaction: `Last inflow: ${lastInflows}`,
      },
      outflows: {
        amount: currencyFormatter(totalOutflows),
        lastTransaction: `Last outflow: ${lastOutflows}`,
      },
      totalBalance: {
        amount: currencyFormatter(totalBalance),
        lastTransaction: `Last transaction: ${totalInterval}`,
      },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <>
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
              amount={highlightData.inflows.amount}
              lastTransaction={highlightData.inflows.lastTransaction}
            />
            <HighlightCard
              type={"down"}
              title={"Outflows"}
              amount={highlightData.outflows.amount}
              lastTransaction={highlightData.outflows.lastTransaction}
            />
            <HighlightCard
              type={"total"}
              title={"Total"}
              amount={highlightData.totalBalance.amount}
              lastTransaction={highlightData.totalBalance.lastTransaction}
            />
          </HighlightCards>
          <Transactions>
            <SubHeader>
              <Title>List</Title>
              {transactions.length > 0 && (
                <TrashButton
                // onPress={handleClearTransactions}
                >
                  <TrashIcon name={"trash"} />
                </TrashButton>
              )}
            </SubHeader>

            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id + uuid.v4()}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};
