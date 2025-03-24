import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} DOTZ - Todos os direitos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;