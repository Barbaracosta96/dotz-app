import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { schema } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';
import styled from 'styled-components'; // Importe styled

// Estilos Componentes
const CadastroPage = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const FormStyled = styled.form` /* Renomeie para evitar conflito */
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

const Cadastro: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [cadastroError, setCadastroError] = useState<string | null>(null);
  const [cadastroSuccess, setCadastroSuccess] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    try {
      setCadastroError(null); // Limpa o erro anterior
      const response = await api.post('/usuarios', {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone,
        endereco: {
          rua: data.rua,
          numero: data.numero,
          complemento: data.complemento,
          cep: data.cep,
          cidade: data.cidade,
          estado: data.estado,
        },
        saldo: 0,
        extrato: [],
        pedidos: []
      });

      if (response.status === 201) {
        setCadastroSuccess(true);
        setTimeout(() => {
          navigate('/login'); // Redirecionar após um breve atraso
        }, 2000); // Aguarda 2 segundos antes de redirecionar
      } else {
        setCadastroError('Erro ao cadastrar. Tente novamente.');
      }
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      setCadastroError(`Erro ao cadastrar: ${error.message}`);
    }
  };

  return (
    <CadastroPage> {/* Use o styled component CadastroPage aqui */}
      <h2>Cadastro</h2>
      {cadastroError && <ErrorMessage>{cadastroError}</ErrorMessage>}
      {cadastroSuccess && <p style={{ color: 'green' }}>Cadastro realizado com sucesso! Redirecionando...</p>}
      <FormStyled onSubmit={handleSubmit(onSubmit)}> {/* Use FormStyled */}
        {/* Inputs do formulário (Sem alterações) */}
        <Label htmlFor="nome">Nome:</Label>
        <Input type="text" id="nome" {...register('nome')} />
          <Label htmlFor="email">Email:</Label>
        <Input type="text" id="email" {...register('email')} />
          <Label htmlFor="senha">Senha:</Label>
        <Input type="text" id="senha" {...register('senha')} />
          <Label htmlFor="telefone">Telefone:</Label>
        <Input type="text" id="telefone" {...register('telefone')} />
          <Label htmlFor="rua">Rua:</Label>
        <Input type="text" id="rua" {...register('rua')} />
          <Label htmlFor="numero">Número:</Label>
        <Input type="text" id="numero" {...register('numero')} />
           <Label htmlFor="complemento">Complemento:</Label>
        <Input type="text" id="complemento" {...register('complemento')} />
          <Label htmlFor="cep">CEP:</Label>
        <Input type="text" id="cep" {...register('cep')} />
          <Label htmlFor="cidade">Cidade:</Label>
        <Input type="text" id="cidade" {...register('cidade')} />
           <Label htmlFor="estado">Estado:</Label>
        <Input type="text" id="estado" {...register('estado')} />
        <Button type="submit">Cadastrar</Button>
      </FormStyled>
    </CadastroPage>
  );
};

export default Cadastro;