import httpClient from "../httpClient";
import CreateUserRequest from "../models/requests/CreateUserRequest";

const BASE_PATH = "/users";

const usersService = {
  signUp: async (
    user: CreateUserRequest
  ): Promise<{ id: string; token: string }> => {
    const response = await httpClient.post(BASE_PATH, user);
    return response.data.id;
  },
  login: async (
    email: string,
    password: string
  ): Promise<{ id: string; token: string }> => {
    const response = await httpClient.post(`${BASE_PATH}/login`, {
      email,
      password,
    });
    return response.data;
  },
};

export default usersService;
