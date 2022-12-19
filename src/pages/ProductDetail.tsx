import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { queryKeys } from '../react-query/constants';
import { getProductById } from '../api/productApi';

export default function ProductDetail() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { productId } = useParams() as { productId: string };
  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery(
    [queryKeys.product, productId],
    () => getProductById(productId)
  );

  function handleClickimages(index: number) {
    setSelectedIndex(index);
  }

  function handleClickBackButton() {
    navigate(-1);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <Wrapper>
        <TitleWrap>
          <h3>상품 정보</h3>
          <BackButtonWrap>
            <button onClick={handleClickBackButton}>←</button>
          </BackButtonWrap>
        </TitleWrap>
        {product && (
          <Content>
            <ImagesWrap>
              <MainImageWrap>
                <img
                  src={[product.thumbnail, ...product.images][selectedIndex]}
                  alt={product.title}
                />
              </MainImageWrap>
              <SubImagesWrap>
                {[product.thumbnail, ...product.images].map((image, index) => (
                  <SubImage
                    key={index}
                    isSelected={index === selectedIndex}
                    onClick={() => handleClickimages(index)}
                  >
                    <img src={image} alt="product" />
                  </SubImage>
                ))}
              </SubImagesWrap>
            </ImagesWrap>
            <InfoWrap>
              <Category>
                <p>{product.category}</p>
                <p>→</p>
                <p>{product.brand}</p>
              </Category>
              <Name>
                <p>{product.title}</p>
              </Name>
              <Rating>
                <p>별점</p>
                <p>{product.rating}</p>
              </Rating>
              <Price>
                <p>{product.discountPercentage}%</p>
                <p>{product.price}$</p>
              </Price>
              <Description>
                <p>설명</p>
                <p>{product.description}</p>
              </Description>
            </InfoWrap>
          </Content>
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const TitleWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  h3 {
    font-size: 22px;
    font-weight: 700;
  }
`;

const BackButtonWrap = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  button {
    font-size: 30px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;
const ImagesWrap = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: cetner;
`;

const MainImageWrap = styled.div`
  display: flex;
  max-height: 500px;
  margin: 0 auto;
  margin-bottom: 30px;
`;

const SubImagesWrap = styled.div`
  display: flex;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px 15px;
  gap: 0 10px;
  overflow-x: auto;
  margin: 0 auto;
`;

const SubImage = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  border: ${(props) => props.isSelected && '1px solid rgb(98, 0, 240)'};
  img {
    width: 100px;
    height: 50px;
  }
  :hover {
    opacity: 0.8;
  }
`;

const InfoWrap = styled.div`
  width: 40%;
`;

const Category = styled.div`
  display: flex;
  gap: 0 10px;
  margin-bottom: 20px;
  padding-bottom: 5px;
  border-bottom: 1px solid #dbdbdb;
  p {
    font-size: 18px;
    :last-child {
      font-weight: 700;
    }
  }
`;

const Name = styled.div`
  width: 100%;
  margin-bottom: 10px;
  p {
    font-size: 22px;
    font-weight: 700;
  }
`;

const Rating = styled.div`
  width: 100%;
  gap: 0 5px;
  display: flex;
  margin-bottom: 10px;
  p {
    font-size: 14px;
  }
`;

const Price = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 0 10px;
  margin-bottom: 30px;
  p {
    :first-child {
      font-size: 18px;
      color: rgb(98, 0, 240);
    }
    color: black;
    font-weight: 700;
    font-size: 22px;
  }
`;

const Description = styled.div`
  width: 100%;
  p {
    font-size: 16px;
    :first-child {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
`;
