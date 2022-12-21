import styled from 'styled-components';
import { Link } from 'react-router-dom';

import InfiniteProduct from '../components/product/InfiniteProduct';

export default function Home() {
  return (
    <Container>
      <TitleWrap>
        <h3>상품 리스트</h3>
        <UploadLinkWrap>
          <SLink to="/product-upload">상품 등록하기</SLink>
        </UploadLinkWrap>
      </TitleWrap>
      <Content>
        <ProductsWrap>
          <InfiniteProduct />
        </ProductsWrap>
      </Content>
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
  justify-content: space-between;
  margin-bottom: 30px;
  h3 {
    font-size: 22px;
    font-weight: 700;
  }
`;

const UploadLinkWrap = styled.div``;

const SLink = styled(Link)`
  color: rgb(98, 0, 240);
  border: 1px solid rgb(98, 0, 240);
  border-radius: 10px;
  padding: 15px 10px;
`;

const Content = styled.div`
  width: 100%;
`;

const ProductsWrap = styled.div`
  width: 100%;
  padding-bottom: 20px;
`;
