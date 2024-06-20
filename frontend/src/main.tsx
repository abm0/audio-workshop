import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { AuthPage } from './pages/AuthPage';
import { MainLayout } from './layouts/MainLayout';
import { Header } from './components/Header';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './index.css';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthLayout } from './layouts/AuthLayout';
import './i18n/config';
import { ABOUT_PATH, AUTH_PATH, MAIN_PATH, REGISTER_PATH } from './shared/constants';
import AboutPage from './pages/AboutPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={AUTH_PATH} element={<AuthLayout headerContent={<Header />} />}>
            <Route index element={<AuthPage />} />
            <Route path={REGISTER_PATH} element={null} />
          </Route>
          <Route 
            path={MAIN_PATH}
            element={
              <ProtectedRoute>
                <MainLayout headerContent={<Header />} />
              </ProtectedRoute>
            }
          >
            <Route index element={<MainPage />} />
            <Route path={ABOUT_PATH} element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
