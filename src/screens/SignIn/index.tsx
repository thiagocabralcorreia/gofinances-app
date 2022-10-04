import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { SocialLoginButton } from "../../components/SocialLoginButton";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
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
        <FooterWrapper>
          <SocialLoginButton title={"Entrar com Google"} svg={GoogleSvg} />
          <SocialLoginButton title={"Entrar com Apple"} svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
