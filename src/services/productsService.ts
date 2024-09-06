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
  createProduct: async (formData: FormData): Promise<Product> => {
    const response = await httpClient.post(BASE_PATH, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  deleteProduct: async (productId: string): Promise<void> => {
    await httpClient.delete(`${BASE_PATH}/${productId}`);
  },
  deleteProductImage: async (
    productId: string,
    imagePath: string
  ): Promise<void> => {
    const splitted = imagePath.split("/");
    const fileName = splitted.pop();
    await httpClient.delete(`${BASE_PATH}/${productId}/images/${fileName}`);
  },
  updateProduct: async (
    productId: string,
    formData: FormData
  ): Promise<Product> => {
    const response = await httpClient.put(
      `${BASE_PATH}/${productId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },
};

export default productsService;
