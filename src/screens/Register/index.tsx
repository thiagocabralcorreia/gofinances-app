import React from "react";

import { Container, Title, Header, Form } from "./styles";
import { Input } from "../../components/Form/Input";

export const Register = () => {
  return (
    <Container>
      <Header>
        <Title>Register</Title>
      </Header>

      <Form>
        <Input placeholder={"Name"} />
        <Input placeholder={"Price"} />
      </Form>
    </Container>
  );
};
