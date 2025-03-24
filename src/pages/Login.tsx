import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/User';
import ErrorMessage from '../components/ErrorMessage';
import { schema } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';

// Estilos Componentes
const LoginPage = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

interface FormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setLoginError(null); // Limpa o erro anterior
      const response = await api.get(`/usuarios?email=${data.email}`);

      if (response.data.length > 0) {
        const user: User = response.data[0];

        if (user.senha === data.senha) {
          login(user);
          navigate('/');
        } else {
          setLoginError('Email ou senha incorretos.');
        }
      } else {
        setLoginError('Email ou senha incorretos.');
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      setLoginError(`Erro ao fazer login: ${error.message}`);
    }
  };

  return (
    <LoginPage>
      <h2>Login</h2>
      {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email">Email:</Label>
        <Input type="email" id="email" {...register('email')} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>

        <Label htmlFor="senha">Senha:</Label>
        <Input type="password" id="senha" {...register('senha')} />
        <ErrorMessage>{errors.senha?.message}</ErrorMessage>

        <Button type="submit">Login</Button>
      </FormStyled>
    </LoginPage>
  );
};

export default Login;