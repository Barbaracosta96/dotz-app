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
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Schema de validação
const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().required('Senha é obrigatória')
});

interface FormData {
  email: string;
  senha: string;
}

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.get<User[]>('/usuarios', {
        params: {
          email: data.email
        }
      });

      const user = response.data[0];

      if (!user || user.senha !== data.senha) {
        setError('Email ou senha inválidos');
        return;
      }

      login(user);
      navigate('/');
    } catch (error) {
      setError('Erro ao fazer login');
    }
  };

  return (
    <LoginPage>
      <h2>Login</h2>
      {error && <ErrorMessage message={error} />}
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('email')} placeholder="Email" type="email" />
        {errors.email && <ErrorMessage message={errors.email.message || ''} />}
        
        <Input {...register('senha')} placeholder="Senha" type="password" />
        {errors.senha && <ErrorMessage message={errors.senha.message || ''} />}
        
        <Button type="submit">Entrar</Button>
      </FormStyled>
    </LoginPage>
  );
}

export default Login;