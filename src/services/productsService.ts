import httpClient from "../httpClient";
import Product from "../models/Product";

const BASE_PATH = "/products";

const productsService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await httpClient.get(BASE_PATH);
    return response.data;
  },
  getProductById: async (productId: string): Promise<Product> => {
    const response = await httpClient.get(`${BASE_PATH}/${productId}`);
    return response.data;
  },
  createProduct: async (
    ownerId: string,
    name: string,
    price: number,
    description?: string
  ): Promise<Product> => {
    const response = await httpClient.post(BASE_PATH, {
      name,
      ownerId,
      price,
      description,
    });
    return response.data;
  },
  deleteProduct: async (productId: string): Promise<void> => {
    await httpClient.delete(`${BASE_PATH}/${productId}`);
  },
  updateProduct: async (product: Product): Promise<Product> => {
    const response = await httpClient.put(
      `${BASE_PATH}/${product.id}`,
      product
    );
    return response.data;
  },
};

export default productsService;

// Promise chaining
// function getAllProducts(): Promise<Product[]> {
//   return httpClient.get(BASE_PATH).then((response) => response.data).catch(err => console.log(err));
// }
