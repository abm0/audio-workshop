import React from "react";
import { Field, Form } from "react-final-form";
import { Box, Button, Heading, Input, Spacer, Stack, Text } from '@chakra-ui/react';
import { isRequired } from "../shared/validators";
import { loginFx } from "../models/auth.effects";

type AuthFormData = {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const handleFormSubmit = (values: AuthFormData) => {
    loginFx(values);
  };

  return (
    <Box>
      <Heading size="md">Авторизация</Heading>
      <Spacer height={8} />
      <Form<AuthFormData> onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <Stack spacing={8}>
            <Field name="email" validate={isRequired}>
              {({ meta, input }) => (
                <Stack spacing={2}>
                  <Text>
                    Email:
                  </Text>
                  <Input name={input.name} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </Stack>
              )}
            </Field>

            <Field name="password" validate={isRequired}>
              {({ input, meta }) => (
                <Stack spacing={2}>
                  <Text>
                    Password:
                  </Text>
                  <Input type="password" name={input.name} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </Stack>
              )}
            </Field>

            
            <Button colorScheme="teal" size="sm" width="auto" onClick={handleSubmit}>Войти</Button>
          </Stack>
        )}
      </Form>
    </Box>
  );
}

export { AuthForm };
