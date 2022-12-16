import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Container>
      <SLink to="/">
        <h2>Bejewul</h2>
      </SLink>
    </Container>
  );
}

const Container = styled.header`
  border-bottom: 1px solid #dbdbdb;
  padding: 30px 10px;
`;

const SLink = styled(Link)`
  h2 {
    font-size: 26px;
    font-weight: 700;
  }
`;
