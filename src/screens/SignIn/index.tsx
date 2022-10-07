import React, { useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { useAuth } from "../../context/auth";
import { SocialLoginButton } from "../../components/SocialLoginButton";
import { Loading } from "../../components/Loading";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Could not connect to Google account.");
      setIsLoading(false);
    }
  };

  const handleSignInWithApple = async () => {
    try {
      setIsLoading(true);
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Could not connect to Apple account.");
      setIsLoading(false);
    }
  };

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
          <SocialLoginButton
            title={"Sign in with Google"}
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SocialLoginButton
            title={"Sign in with Apple"}
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>

        {isLoading && <Loading />}
      </Footer>
    </Container>
  );
};
