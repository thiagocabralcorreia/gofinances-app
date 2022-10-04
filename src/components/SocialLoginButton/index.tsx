import React from "react";
import { Title, Button, ImageContainer } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

interface SocialLoginButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SocialLoginButton = ({
  title,
  svg: Svg,
  ...rest
}: SocialLoginButtonProps) => {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Button>
  );
};
