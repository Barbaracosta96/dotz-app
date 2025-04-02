import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/Product';
import ErrorMessage from '../components/ErrorMessage';

// Estilos Componentes
const ProdutosPage = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ITEMS_PER_PAGE = 6; // Define o número de itens por página

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [produtosError, setProdutosError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setProdutosError(null); // Limpa o erro anterior
        const response = await api.get(`/produtos?_page=${currentPage}&_limit=${ITEMS_PER_PAGE}`);
        setProdutos(response.data);

        const totalCountHeader = response.headers['x-total-count'];
        const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
        setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));

      } catch (error: any) {
        console.error('Erro ao buscar produtos:', error);
        setProdutosError(`Erro ao buscar produtos: ${error.message}`);
      }
    };

    fetchProdutos();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ProdutosPage>
      <Title>Produtos Disponíveis para Resgate</Title>
      {produtosError && <ErrorMessage message={produtosError} />}
      <ProductList>
        {produtos.map(produto => (
          <ProductCard key={produto.id} product={produto} />
        ))}
      </ProductList>

      <Pagination>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </PageButton>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <PageButton
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            style={{fontWeight: currentPage === pageNumber ? 'bold' : 'normal'}} // Destaca a página atual
          >
            {pageNumber}
          </PageButton>
        ))}

        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próximo
        </PageButton>
      </Pagination>
    </ProdutosPage>
  );
};

export default Produtos;