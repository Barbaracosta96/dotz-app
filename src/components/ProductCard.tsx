import React from 'react';
import styled from 'styled-components';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductName = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: #007bff;
`;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <ProductName>{product.nome}</ProductName>
      <ProductPrice>Preço: {product.preco} Dotz</ProductPrice>
      <p>Categoria: {product.categoria}</p>
      <p>Subcategoria: {product.subcategoria}</p>
    </Card>
  );
};

export default ProductCard;