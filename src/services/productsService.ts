import httpClient from "../httpClient";
import Product from "../models/Product";

const BASE_PATH = "/products";

const productsService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await httpClient.get(BASE_PATH);
    return response.data;
  },
  createProduct: async (product: Product): Promise<Product> => {
    const response = await httpClient.post(BASE_PATH, product);
    return response.data;
  },
};

export default productsService;

// Promise chaining
// function getAllProducts(): Promise<Product[]> {
//   return httpClient.get(BASE_PATH).then((response) => response.data);
// }