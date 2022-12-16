import styled from 'styled-components';
import { Product } from '../../types/product';

type ProductCardProps = { productData: Product };

export default function ProductCard({ productData }: ProductCardProps) {
  return (
    <Container>
      <ThumbnailWrap>
        <img src={productData.thumbnail} alt="Thumbnail" />
      </ThumbnailWrap>
      <Content>
        <Name>
          <p>{productData.title}</p>
        </Name>
        <Description>
          <p>{productData.description.slice(0, 40)}...</p>
        </Description>
        <Price>
          <p>{productData.discountPercentage}%</p>
          <p>{productData.price}$</p>
        </Price>
        <Rating>
          <p>평점</p>
          <p>{productData.rating}</p>
        </Rating>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  cursor: pointer;
`;

const ThumbnailWrap = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  padding: 10px 0;
`;

const Name = styled.div`
  width: 100%;
  p {
    font-weight: 700;
  }
`;

const Description = styled.div`
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const Price = styled.div`
  p {
    :first-child {
      color: blue;
      font-weight: 700;
    }
  }
  width: 100%;
  display: flex;
  gap: 0 10px;
`;

const Rating = styled.div`
  p {
    :first-child {
      color: orange;
      font-weight: 700;
    }
  }
  width: 100%;
  display: flex;
  gap: 0 10px;
`;
