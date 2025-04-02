import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/User';
import ErrorMessage from '../components/ErrorMessage';

// Estilos Componentes
const SaldoPage = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const SaldoContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SaldoTitle = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

const SaldoValue = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  color: #28a745;
`;

const ExtratoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ExtratoItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExtratoDescricao = styled.span`
  color: #555;
`;

// Defina uma interface para as props do ExtratoValor
interface ExtratoValorProps {
  valor: number;
}

const ExtratoValor = styled.span<ExtratoValorProps>`
  font-weight: bold;
  color: ${props => (props.valor > 0 ? '#28a745' : '#dc3545')};
`;

const Saldo: React.FC = () => {
  const { user } = useAuth();
  const [saldo, setSaldo] = useState<number | null>(null);
  const [extrato, setExtrato] = useState<any[]>([]);
  const [saldoError, setSaldoError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        setSaldoError(null); // Limpa o erro anterior
        if (user) {
          const response = await api.get(`/usuarios/${user.id}`);
          if (response.data) {
            const userData: User = response.data;
            setSaldo(userData.saldo);
            setExtrato(userData.extrato);
          }
        }
      } catch (error: any) {
        console.error('Erro ao buscar saldo e extrato:', error);
        setSaldoError(`Erro ao buscar saldo: ${error.message}`);
      }
    };

    fetchSaldo();
  }, [user]);

  if (!user) {
    return (
      <SaldoPage>
        Por favor, faça login para ver seu saldo.
      </SaldoPage>
    );
  }

  return (
    <SaldoPage>
      {saldoError && <ErrorMessage message={saldoError} />}
      <SaldoContainer>
        <SaldoTitle>Seu Saldo</SaldoTitle>
        {saldo !== null ? (
          <SaldoValue>{saldo} Dotz</SaldoValue>
        ) : (
          <p>Carregando saldo...</p>
        )}
      </SaldoContainer>

      <div>
        <h3>Extrato</h3>
        <ExtratoList>
          {extrato.map(item => (
            <ExtratoItem key={item.id}>
              <ExtratoDescricao>{item.descricao} ({new Date(item.data).toLocaleDateString()})</ExtratoDescricao>
              <ExtratoValor valor={item.valor}>{item.valor} Dotz</ExtratoValor>
            </ExtratoItem>
          ))}
        </ExtratoList>
      </div>
    </SaldoPage>
  );
};

export default Saldo;