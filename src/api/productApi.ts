import axios, { AxiosRequestConfig } from 'axios';
import { Product } from '../types/product';

const BASE_URL = 'http://localhost:4000';
const config: AxiosRequestConfig = { baseURL: BASE_URL };

export const axiosInstance = axios.create(config);

export async function getAllProducts(): Promise<Product[]> {
  const { data } = await axiosInstance.get(`${BASE_URL}/products`);
  return data;
}
