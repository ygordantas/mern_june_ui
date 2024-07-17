import Address from "./Address";

export default interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address: Address;
}
