import httpClient from "../httpClient";
import Product from "../models/Product";
import CreateUserRequest from "../models/requests/CreateUserRequest";

const BASE_PATH = "/users";

const usersService = {
  getUserProducts: async (userId: number): Promise<Product[]> => {
    const response = await httpClient.get(`${BASE_PATH}/${userId}/products`);
    return response.data;
  },
  signUp: async (user: CreateUserRequest): Promise<string> => {
    const response = await httpClient.post(BASE_PATH, user);
    return response.data.id;
  },
  login: async (email: string, password: string): Promise<string> => {
    const response = await httpClient.post(`${BASE_PATH}/login`, {
      email,
      password,
    });
    return response.data.id;
  },
};

export default usersService;
