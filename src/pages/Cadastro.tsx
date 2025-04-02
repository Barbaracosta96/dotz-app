import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import styled from 'styled-components';

// Estilos Componentes
const CadastroPage = styled.div`
  padding: 20px;
  max-width: 500px;
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

// Schema de validação
const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  telefone: yup.string().required('Telefone é obrigatório'),
  rua: yup.string().required('Rua é obrigatória'),
  numero: yup.string().required('Número é obrigatório'),
  complemento: yup.string(),
  cep: yup.string().required('CEP é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().required('Estado é obrigatório')
});

interface FormData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  rua: string;
  numero: string;
  complemento?: string;
  cep: string;
  cidade: string;
  estado: string;
}

function Cadastro() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/usuarios', {
        ...data,
        saldo: 0,
        extrato: [],
        pedidos: [],
        endereco: {
          rua: data.rua,
          numero: data.numero,
          complemento: data.complemento,
          cep: data.cep,
          cidade: data.cidade,
          estado: data.estado
        }
      });
      navigate('/login');
    } catch (error) {
      setError('Erro ao cadastrar usuário');
    }
  };

  return (
    <CadastroPage>
      <h2>Cadastro</h2>
      {error && <ErrorMessage message={error} />}
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="nome">Nome:</Label>
        <Input {...register('nome')} placeholder="Nome" />
        {errors.nome && <ErrorMessage message={errors.nome.message || ''} />}
        
        <Label htmlFor="email">Email:</Label>
        <Input {...register('email')} placeholder="Email" type="email" />
        {errors.email && <ErrorMessage message={errors.email.message || ''} />}
        
        <Label htmlFor="senha">Senha:</Label>
        <Input {...register('senha')} placeholder="Senha" type="password" />
        {errors.senha && <ErrorMessage message={errors.senha.message || ''} />}
        
        <Label htmlFor="telefone">Telefone:</Label>
        <Input {...register('telefone')} placeholder="Telefone" />
        {errors.telefone && <ErrorMessage message={errors.telefone.message || ''} />}
        
        <Label htmlFor="rua">Rua:</Label>
        <Input {...register('rua')} placeholder="Rua" />
        {errors.rua && <ErrorMessage message={errors.rua.message || ''} />}
        
        <Label htmlFor="numero">Número:</Label>
        <Input {...register('numero')} placeholder="Número" />
        {errors.numero && <ErrorMessage message={errors.numero.message || ''} />}
        
        <Label htmlFor="complemento">Complemento (opcional):</Label>
        <Input {...register('complemento')} placeholder="Complemento" />
        
        <Label htmlFor="cep">CEP:</Label>
        <Input {...register('cep')} placeholder="CEP" />
        {errors.cep && <ErrorMessage message={errors.cep.message || ''} />}
        
        <Label htmlFor="cidade">Cidade:</Label>
        <Input {...register('cidade')} placeholder="Cidade" />
        {errors.cidade && <ErrorMessage message={errors.cidade.message || ''} />}
        
        <Label htmlFor="estado">Estado:</Label>
        <Input {...register('estado')} placeholder="Estado" />
        {errors.estado && <ErrorMessage message={errors.estado.message || ''} />}
        
        <Button type="submit">Cadastrar</Button>
      </FormStyled>
    </CadastroPage>
  );
}

export default Cadastro;