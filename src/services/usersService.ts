import httpClient from "../httpClient";
import Product from "../models/Product";

const BASE_PATH = "/users";

const usersService = {
  getUserProducts: async (userId: number): Promise<Product[]> => {
    const response = await httpClient.get(`${BASE_PATH}/${userId}/products`);
    return response.data;
  },
};

export default usersService;
