import { Product } from '../../../types/product';

export function getAllPagesProductCount(allPages: Product[][]): number {
  let count = 0;
  for (let i = 0; i < allPages.length - 1; i++) {
    for (let j = 0; j < allPages[i].length - 1; j++) {
      count += 1;
    }
  }
  return count;
}
