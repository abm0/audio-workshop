import { Field, Form } from "react-final-form";
import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { isRequired } from "../shared/validators";
import { signupFx } from "../models/auth.effects";
import { useTranslation } from "react-i18next";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { t } = useTranslation();

  const handleFormSubmit = (values: RegisterFormData) => {
    signupFx(values);
  };

  return (
    <Form<RegisterFormData> onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <Stack spacing={4}>
          <Field name="name" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <Text>
                  {t('user_name')}:
                </Text>
                <Input name={input.name} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>

          <Field name="email" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <Text>
                  {t('email')}:
                </Text>
                <Input name={input.name} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>

          <Field name="password" validate={isRequired}>
            {({ input, meta }) => (
              <Stack spacing={2}>
                <Text>
                  {t('password')}:
                </Text>
                <Input type="password" name={input.name} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>


          <Button
            colorScheme="teal"
            size="sm"
            width="auto"
            onClick={handleSubmit}
          >
            {t('sign_in')}
          </Button>
        </Stack>
      )}
    </Form>
  );
}

export { RegisterForm };
