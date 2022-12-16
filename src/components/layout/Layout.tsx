import styled from 'styled-components';
import Header from './Header';

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <View>
      <Header />
      <Main>{children}</Main>
    </View>
  );
}

const View = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
`;
