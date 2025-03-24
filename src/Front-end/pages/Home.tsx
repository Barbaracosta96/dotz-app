import React from 'react';
import styled from 'styled-components';

const HomePage = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
`;

const Home: React.FC = () => {
  return (
    <HomePage>
      <Title>Bem-vindo ao Programa de Fidelidade Dotz!</Title>
      <p>Acumule pontos e troque por produtos e serviços.</p>
    </HomePage>
  );
};

export default Home;