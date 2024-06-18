import { Field, Form } from "react-final-form";
import { Button, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { isRequired } from "../shared/validators";
import { loginFx } from "../models/auth.effects";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type AuthFormData = {
  email: string;
  password: string;
}

const AuthForm = () => {
  const { t } = useTranslation();
  const toast = useToast()
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (values: AuthFormData) => {
    setIsSubmitting(true);
    
    try {
      await loginFx(values);

      setIsSubmitting(false);
      
      toast({
        title: t('success'),
        description: t('message__log_in'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch(e) {
      setIsSubmitting(false);

      toast({
        title: t('something_wrond'),
        description: t('message__log_in_failed'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Form<AuthFormData> onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <Stack spacing={4}>
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
            isLoading={isSubmitting}
            onClick={handleSubmit}
          >
            {t('log_in')}
          </Button>
        </Stack>
      )}
    </Form>
  );
}

export { AuthForm };
