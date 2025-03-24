import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5em;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #da190b;
  }
`;

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Logo>DOTZ</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/saldo">Saldo</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/cadastro">Cadastro</NavLink>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;