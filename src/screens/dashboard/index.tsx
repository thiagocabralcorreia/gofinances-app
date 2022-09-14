import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

import {
  Container,
  Header,
  HighlightCards,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from "./styles";

export function Dashboard() {
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
          <Icon name={"power"} />
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
    </Container>
  );
}
