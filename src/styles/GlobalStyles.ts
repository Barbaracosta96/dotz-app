import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f5f5f5; /* Adicione uma cor de fundo geral */
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    padding: 20px; /* Aumente o padding padrão */
  }

  button {
    cursor: pointer;
    transition: background-color 0.3s ease; /* Adicione uma transição suave aos botões */
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="tel"] {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px; /* Arredonde mais os inputs */
    font-size: 16px;
    margin-bottom: 10px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff; /* Destaque o input quando estiver em foco */
      outline: none;
    }
  }

  label {
    font-weight: 500; /* Um pouco menos negrito para as labels */
    margin-bottom: 5px;
    display: block; /* Garante que as labels ocupem toda a largura */
  }
`;

export default GlobalStyle;