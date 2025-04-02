// src/components/ErrorMessage.tsx
import React from 'react';
import styled from 'styled-components';

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 4px 0;
`;

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorText>{message}</ErrorText>;
};

export default ErrorMessage;