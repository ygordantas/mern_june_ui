import User from "../User";

export default interface CreateUserRequest extends User {
  password: string;
  repeatPassword: string;
}
