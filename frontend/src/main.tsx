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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthLayout headerContent={<Header />} />}>
            <Route index element={<AuthPage />} />
            <Route path="register" element={null} />
          </Route>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainLayout headerContent={<Header />} />
              </ProtectedRoute>
            }
          >
            <Route path="/main" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
