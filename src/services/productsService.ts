import { useContext, useMemo } from "react";
import httpClient from "../httpClient";
import Product from "../models/Product";
import { UserContext } from "../contexts/userContext";

const BASE_PATH = "/products";

const useProductsService = () => {
  const { token } = useContext(UserContext);

  const authHeader = useMemo(
    () => ({ Authorization: "Bearer " + token }),
    [token]
  );

  const productsService = useMemo(
    () => ({
      getUserProducts: async (userId: string): Promise<Product[]> => {
        const response = await httpClient.get(`${BASE_PATH}/users/${userId}`, {
          headers: authHeader,
        });
        return response.data;
      },
      getAllProducts: async (): Promise<Product[]> => {
        const response = await httpClient.get(BASE_PATH, {
          headers: authHeader,
        });
        return response.data;
      },
      getProductById: async (productId: string): Promise<Product> => {
        const response = await httpClient.get(`${BASE_PATH}/${productId}`, {
          headers: authHeader,
        });
        return response.data;
      },
      createProduct: async (formData: FormData): Promise<Product> => {
        const response = await httpClient.post(BASE_PATH, formData, {
          headers: { "Content-Type": "multipart/form-data", ...authHeader },
        });
        return response.data;
      },
      deleteProduct: async (productId: string): Promise<void> => {
        await httpClient.delete(`${BASE_PATH}/${productId}`, {
          headers: authHeader,
        });
      },
      deleteProductImage: async (
        productId: string,
        imagePath: string
      ): Promise<void> => {
        const splitted = imagePath.split("/");
        const fileName = splitted.pop();
        await httpClient.delete(
          `${BASE_PATH}/${productId}/images/${fileName}`,
          {
            headers: authHeader,
          }
        );
      },
      updateProduct: async (
        productId: string,
        formData: FormData
      ): Promise<Product> => {
        const response = await httpClient.put(
          `${BASE_PATH}/${productId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data", ...authHeader },
          }
        );
        return response.data;
      },
    }),
    [authHeader]
  );

  return productsService;
};

export default useProductsService;
