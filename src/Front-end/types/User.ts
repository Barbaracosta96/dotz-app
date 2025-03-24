import { Order } from "./Order";
import { Transaction } from "./Transaction";

export interface User {
    senha: string;
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco?: Address;
    saldo: number;
    extrato: Transaction[];
    pedidos: Order[];
  }
  
  export interface Address {
    rua: string;
    numero: string;
    complemento?: string;
    cep: string;
    cidade: string;
    estado: string;
  }