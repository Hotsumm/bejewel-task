import axios, { AxiosRequestConfig } from 'axios';
import { Product, PartialBy } from '../types/product';

const BASE_URL = 'http://localhost:4000';
const config: AxiosRequestConfig = { baseURL: BASE_URL };

export const axiosInstance = axios.create(config);

export async function getAllProducts(): Promise<Product[]> {
  const { data } = await axiosInstance.get(`${BASE_URL}/products`);
  return data;
}

export async function getProductById(id: string): Promise<Product> {
  const { data } = await axiosInstance.get(`${BASE_URL}/products/${id}`);

  return data;
}

export async function postProduct(
  formData: PartialBy<Product, 'id'>
): Promise<Product> {
  const { data } = await axiosInstance.post(`${BASE_URL}/products`, formData);
  return data;
}

export async function patchProductById(
  productId: number,
  formData: Product
): Promise<Product> {
  const { data } = await axiosInstance.patch(
    `${BASE_URL}/products/${productId}`,
    formData
  );
  return data;
}

export async function deleteProductById(productId: number): Promise<Product> {
  const { data } = await axiosInstance.delete(
    `${BASE_URL}/products/${productId}`
  );
  return data;
}
