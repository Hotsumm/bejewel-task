import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ProductForm from './ProductForm';
import { patchProductById } from '../../api/productApi';
import { Product } from '../../types/product';
import { queryKeys } from '../../react-query/constants';
type ProductEditModalProps = {
  product: Product;
  handleToggleModal: () => void;
};

export default function ProductEditModal({
  product,
  handleToggleModal,
}: ProductEditModalProps) {
  const [formData, setFormData] = useState<Product>(product);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (formData: Product) => patchProductById(formData.id, formData),
    {
      onSuccess: (data: Product) => {
        queryClient.invalidateQueries([queryKeys.products]);
        queryClient.setQueriesData<Product[]>(
          [queryKeys.products, { id: data.id }],
          (oldData) => (oldData ? [...oldData, data] : oldData)
        );
        alert('상품수정이 완료되었습니다.');
        handleToggleModal();
      },
    }
  );

  function handleSubmit(event: any) {
    event.preventDefault();
    mutate(formData);
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

  return (
    <Container>
      <Modal>
        <TitleWrap>
          <h3>상품 편집</h3>
          <CloseButtonWrap onClick={handleToggleModal}>
            <button>X</button>
          </CloseButtonWrap>
        </TitleWrap>
        <Content>
          <ProductForm
            formData={formData}
            handleSubmit={handleSubmit}
            handleChangeForm={handleChangeForm}
          />
        </Content>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
  width: 500px;
  background: white;
`;

const TitleWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  border: 1px solid #dbdbdb;
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
`;

const CloseButtonWrap = styled.div`
  position: absolute;
  top: 13px;
  left: 13px;
  button {
    font-size: 20px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 20px 30px;
`;
