import { AuthForm } from "../components/AuthForm";
import { $isAuthenticated } from "../models/auth";
import { useUnit } from "effector-react";
import { Navigate } from "react-router-dom";
import { MAIN_PATH } from "../shared/constants";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { RegisterForm } from "../components/RegisterForm";

const AuthPage = () => {
  const { t } = useTranslation();
  const isAuthenticated = useUnit($isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={MAIN_PATH} />
  }
  
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>{t('authorization')}</Tab>
        <Tab>{t('registration')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AuthForm />
        </TabPanel>
        <TabPanel>
          <RegisterForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export { AuthPage };
