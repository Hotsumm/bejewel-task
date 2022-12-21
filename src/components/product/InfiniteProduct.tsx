import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import ProductCard from './ProductCard';
import { getAllPagesProductCount } from './utils/utils';
import { getProductsByPage } from '../../api/productApi';
import { queryKeys } from '../../react-query/constants';

export default function InfiniteProduct() {
  const { data, isLoading, isError, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      [queryKeys.products],
      ({ pageParam = 1 }) => getProductsByPage(pageParam),
      {
        getNextPageParam: (lastPage, allPages) =>
          lastPage[lastPage.length - 1].id ===
          getAllPagesProductCount(allPages) - 1
            ? undefined
            : allPages.length + 1,
      }
    );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!...</p>;
  if (data.pages.length === 0) return <p>The product does not exist.</p>;

  return (
    <>
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
        <Products>
          {data &&
            data.pages.length > 0 &&
            data.pages.map((page) =>
              page.map((pageData) => (
                <Link key={pageData.id} to={`product/${pageData.id}`}>
                  <ProductCard productData={pageData} />
                </Link>
              ))
            )}
        </Products>
        {isFetching && <p>Loading...</p>}
      </InfiniteScroll>
    </>
  );
}

const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, calc((100% - 32px) / 4));
  gap: 140px 16px;
  margin-bottom: 20px;
`;
