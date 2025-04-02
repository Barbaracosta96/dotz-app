import React, { JSX } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Saldo from './pages/Saldo';
import Produtos from './pages/Produtos';
import GlobalStyle from './styles/GlobalStyles';
import { useAuth } from './context/AuthContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/saldo" element={<PrivateRoute><Saldo /></PrivateRoute>} />
            <Route path="/produtos" element={<PrivateRoute><Produtos /></PrivateRoute>} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </>
  );
}

// Componente PrivateRoute para proteger rotas
function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default App;