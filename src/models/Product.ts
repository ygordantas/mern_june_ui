export default interface Product {
    id: string;
    name: string;
    price: number;
    postedBy: string;
    postedAt: Date;
    imageUrl: string;
    soldAt?: Date;
    description?: string;
    isSold?: boolean;
}