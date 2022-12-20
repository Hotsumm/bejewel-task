import styled from 'styled-components';
import { Product, PartialBy } from '../../types/product';

type ProductFormProps = {
  formData: PartialBy<Product, 'id'>;
  handleSubmit: (event: any) => void;
  handleChangeForm: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function ProductForm({
  formData,
  handleSubmit,
  handleChangeForm,
}: ProductFormProps) {
  return (
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
      <UploadButtonWrap>
        <button type="submit">제출하기</button>
      </UploadButtonWrap>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
`;

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
const UploadButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    color: rgb(98, 0, 240);
    border: 1px solid rgb(98, 0, 240);
    border-radius: 10px;
    padding: 15px 20px;
    margin-top: 20px;
  }
`;
