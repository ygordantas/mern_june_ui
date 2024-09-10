import { useCallback, useContext, useMemo } from "react";
import httpClient from "../httpClient";
import Product from "../models/Product";
import { UserContext } from "../contexts/userContext";

const BASE_PATH = "/products";

const useProductService = () => {
  const { token } = useContext(UserContext);

  const authHeader = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  return {
    getUserProducts: useCallback(
      async (userId: string): Promise<Product[]> => {
        const response = await httpClient.get(`${BASE_PATH}/users/${userId}`, {
          headers: authHeader,
        });
        return response.data;
      },
      [authHeader]
    ),
    getAllProducts: useCallback(async (): Promise<Product[]> => {
      const response = await httpClient.get(BASE_PATH, {
        headers: authHeader,
      });
      return response.data;
    }, [authHeader]),
    getProductById: useCallback(
      async (productId: string): Promise<Product> => {
        const response = await httpClient.get(`${BASE_PATH}/${productId}`, {
          headers: authHeader,
        });
        return response.data;
      },
      [authHeader]
    ),
    createProduct: useCallback(
      async (formData: FormData): Promise<Product> => {
        const response = await httpClient.post(BASE_PATH, formData, {
          headers: { "Content-Type": "multipart/form-data", ...authHeader },
        });
        return response.data;
      },
      [authHeader]
    ),
    deleteProduct: useCallback(
      async (productId: string): Promise<void> => {
        await httpClient.delete(`${BASE_PATH}/${productId}`, {
          headers: authHeader,
        });
      },
      [authHeader]
    ),
    deleteProductImage: useCallback(
      async (productId: string, imagePath: string): Promise<void> => {
        const splitted = imagePath.split("/");
        const fileName = splitted.pop();
        await httpClient.delete(
          `${BASE_PATH}/${productId}/images/${fileName}`,
          {
            headers: authHeader,
          }
        );
      },
      [authHeader]
    ),
    updateProduct: useCallback(
      async (productId: string, formData: FormData): Promise<Product> => {
        const response = await httpClient.put(
          `${BASE_PATH}/${productId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data", ...authHeader },
          }
        );
        return response.data;
      },
      [authHeader]
    ),
  };
};

export default useProductService;
