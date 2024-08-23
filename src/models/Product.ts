export default interface Product {
  id: number;
  name: string;
  price: number;
  ownerId: number;
  ownerEmail: string;
  postedAt: Date;
  images: string[];
  soldAt?: Date;
  description?: string;
  isSold?: boolean;
}
