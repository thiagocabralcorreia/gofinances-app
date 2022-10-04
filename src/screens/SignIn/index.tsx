import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from "../../assets/logo.svg";

import {
  Container,
  Title,
  Header,
  TitleWrapper,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export const SignIn = () => {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Manage{"\n"}your money{"\n"}with ease
          </Title>
        </TitleWrapper>

        <SignInTitle>Sign in to your account</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper></FooterWrapper>
      </Footer>
    </Container>
  );
};
