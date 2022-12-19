import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getAllProducts } from '../api/productApi';
import { queryKeys } from '../react-query/constants';
import ProductCard from '../components/product/ProductCard';

export default function Home() {
  const {
    isLoading,
    isError,
    data: products = [],
  } = useQuery([queryKeys.products], getAllProducts);

  return (
    <Container>
      <TitleWrap>
        <h3>상품 리스트</h3>
      </TitleWrap>
      <ProductsWrap>
        {isError && <p>Something went wrong!...</p>}
        {!isError && isLoading && <p>Loading...</p>}
        {!isError && !isLoading && products.length === 0 && (
          <p>The product does not exist.</p>
        )}
        <Products>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <Link key={product.id} to={`product/${product.id}`}>
                <ProductCard productData={product} />
              </Link>
            ))}
        </Products>
      </ProductsWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
`;

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  h3 {
    font-size: 22px;
    font-weight: 700;
  }
`;

const ProductsWrap = styled.div`
  width: 100%;
`;

const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, calc((100% - 32px) / 4));
  gap: 140px 16px;
`;
