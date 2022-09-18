import React from "react";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { Container, Title, Header, Form, InputWrapper } from "./styles";

export const Register = () => {
  return (
    <Container>
      <Header>
        <Title>Register</Title>
      </Header>

      <Form>
        <InputWrapper>
          <Input placeholder={"Name"} />
          <Input placeholder={"Price"} />
        </InputWrapper>
        <Button title="Sent" />
      </Form>
    </Container>
  );
};
