export default interface Product {
    id: string;
    name: string;
    price: number;
    postedBy: string;
    postedAt: Date;
    images: string[];
    soldAt?: Date;
    description?: string;
    isSold?: boolean;
}