import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '../types/product';

import { queryKeys } from '../react-query/constants';
import { postProduct } from '../api/productApi';
import { useNavigate } from 'react-router-dom';

const DUMMY_THUMBNAIL = 'https://i.dummyjson.com/data/products/1/thumbnail.jpg';
const DUMMY_IMAGES = [
  'https://i.dummyjson.com/data/products/1/2.jpg',
  'https://i.dummyjson.com/data/products/1/3.jpg',
  'https://i.dummyjson.com/data/products/1/4.jpg',
];

const defaultFormData = {
  thumbnail: DUMMY_THUMBNAIL,
  images: DUMMY_IMAGES,
  title: '',
  category: '',
  brand: '',
  description: '',
  price: 1,
  rating: 0,
  discountPercentage: 10,
  stock: 100,
};

export default function ProductUpload() {
  const [formData, setFormData] = useState<Product>(defaultFormData);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [subImagesPreview, setSubImagesPreview] = useState<string[]>([]);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate } = useMutation((formData: Product) => postProduct(formData), {
    onSuccess: (data: Product) => {
      queryClient.invalidateQueries([queryKeys.products]);
      queryClient.setQueriesData<Product[]>([queryKeys.products], (oldData) =>
        oldData ? [...oldData, data] : oldData
      );

      alert('상품등록에 성공하였습니다.');
      navigate(`/product/${data.id}`);
    },
  });

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const { files } = event.target;

    if (!files) return;

    if (files.length > 10) {
      alert('제품사진을 10장 이하로 업로드 해주세요.');
      return;
    }
    const images: string[] = Array.from(files).map((file: any) =>
      URL.createObjectURL(file)
    );

    if (id === 'mainImage') {
      setMainImagePreview(images[0]);
    } else {
      setSubImagesPreview(images);
    }
  }

  function handleChangeForm(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const {
      target: { id, value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (!mainImagePreview || subImagesPreview.length < 1) {
      alert('상품 이미지를 업로드 해주세요.');
      return;
    }

    mutate(formData);
  }

  return (
    <Container>
      <TitleWrap>
        <h3>상품 등록</h3>
      </TitleWrap>
      <Content>
        <UploadWrap>
          <MainImageUploadWrap>
            <h4>대표 이미지</h4>
            {mainImagePreview ? (
              <MainImageWrap>
                <img src={mainImagePreview} alt="Product" />
              </MainImageWrap>
            ) : (
              <LabelWrap>
                <label htmlFor="input-file">
                  <p>Upload</p>
                </label>
                <input
                  type="file"
                  id="input-file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(event) => handleFileChange(event, 'mainImage')}
                />
              </LabelWrap>
            )}
          </MainImageUploadWrap>
          <SubImageUploadWrap>
            <h4>추가 이미지</h4>
            {subImagesPreview.length > 0 ? (
              <SubImageWrap>
                {subImagesPreview.map((image, index) => (
                  <img src={image} alt="Product" key={index} />
                ))}
              </SubImageWrap>
            ) : (
              <LabelWrap>
                <label htmlFor="input-files">
                  <p>Upload (최대 10장)</p>
                </label>
                <input
                  type="file"
                  id="input-files"
                  style={{ display: 'none' }}
                  accept="image/*"
                  multiple
                  onChange={(event) => handleFileChange(event, 'subImage')}
                />
              </LabelWrap>
            )}
          </SubImageUploadWrap>
        </UploadWrap>
        <Form onSubmit={handleSubmit}>
          <InputWrap>
            <p>카테고리</p>
            <input
              type="text"
              required
              onChange={handleChangeForm}
              id="category"
              value={formData.category}
            />
          </InputWrap>
          <InputWrap>
            <p>브랜드</p>
            <input
              type="text"
              required
              onChange={handleChangeForm}
              id="brand"
              value={formData.brand}
            />
          </InputWrap>
          <InputWrap>
            <p>상품이름</p>
            <input
              type="text"
              required
              onChange={handleChangeForm}
              id="title"
              value={formData.title}
            />
          </InputWrap>
          <InputWrap>
            <p>가격($)</p>
            <input
              type="number"
              onChange={handleChangeForm}
              min={1}
              id="price"
              value={formData.price}
            />
          </InputWrap>
          <InputWrap>
            <p>설명</p>
            <textarea
              required
              onChange={handleChangeForm}
              id="description"
              value={formData.description}
            />
          </InputWrap>
          <UploadButton type="submit">등록하기</UploadButton>
        </Form>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding-top: 50px;
`;
const TitleWrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
  h3 {
    font-size: 22px;
    font-weight: 700;
  }
`;

const Content = styled.div`
  width: 100%;
`;

const UploadWrap = styled.div`
  margin-bottom: 40px;
`;

const MainImageWrap = styled.div`
  img {
    width: 300px;
    height: 150px;
  }
`;

const MainImageUploadWrap = styled.div`
  margin-bottom: 20px;
  h4 {
    margin-bottom: 10px;
    font-weight: 700;
  }
`;

const SubImageUploadWrap = styled.div`
  width: 100%;
  h4 {
    margin-bottom: 10px;
    font-weight: 700;
  }
`;

const SubImageWrap = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0 10px;
  img {
    width: 200px;
    height: 150px;
  }
`;

const LabelWrap = styled.div`
  position: relative;
  width: 150px;
  height: 100px;
  label {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    cursor: pointer;
    border: 1px dashed #16a085;
    font-size: 14px;
    :hover {
      opacity: 0.6;
    }
  }
`;

const Form = styled.form``;

const InputWrap = styled.div`
  & + & {
    margin-top: 15px;
  }
  display: flex;
  align-items: center;
  gap: 0 10px;
  p {
    width: 75px;
  }
  input,
  textarea {
    border: 1px solid #dbdbdb;
    padding: 5px;
  }
`;
const UploadButton = styled.button`
  color: rgb(98, 0, 240);
  border: 1px solid rgb(98, 0, 240);
  border-radius: 10px;
  padding: 15px 20px;
  margin-top: 20px;
`;
