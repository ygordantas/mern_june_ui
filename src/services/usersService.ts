import httpClient from "../httpClient";
import CreateUserRequest from "../models/requests/CreateUserRequest";
import AuthResponse from "../models/responses/AuthResponse";

const BASE_PATH = "/users";

const usersService = {
  signUp: async (user: CreateUserRequest): Promise<AuthResponse> => {
    const response = await httpClient.post(BASE_PATH, user);
    return response.data;
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await httpClient.post(`${BASE_PATH}/login`, {
      email,
      password,
    });
    return response.data;
  },
};

export default usersService;
