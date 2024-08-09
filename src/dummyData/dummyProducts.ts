import Product from "../models/Product";

const date = new Date();
const currentMonth = date.getMonth();

date.setMonth(currentMonth - 3);

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    postedBy: "User@email.com",
    postedAt: date,
    images: [
      "https://plus.unsplash.com/premium_photo-1684445034959-b3faeb4597d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHRhYmxlfGVufDB8fDB8fHww",
    ],
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    postedBy: "User2@email.com",
    postedAt: date,
    images: [
      "https://plus.unsplash.com/premium_photo-1705937171534-def8d344cf6b?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    postedBy: "anotny@email.com",
    postedAt: date,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    images: [
      "https://images.unsplash.com/photo-1459603677915-a62079ffd002?q=80&w=2134&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1667251760504-096946b820af?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "4",
    name: "Book",
    price: 10.99,
    postedBy: "anotny@email.com",
    postedAt: date,
    images: [
      "https://plus.unsplash.com/premium_photo-1667251760504-096946b820af?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://media.istockphoto.com/id/1460007178/photo/library-books-on-table-and-background-for-studying-learning-and-research-in-education-school.webp?b=1&s=170667a&w=0&k=20&c=TRED57BZuROoCEP9kR85pW38PLz32onmM8106OoXeGQ=",
    ],
  },
  {
    id: "5",
    name: "Product 5",
    price: 3.15,
    postedBy: "anotny@email.com",
    postedAt: date,
    images: [
      "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

export default dummyProducts;
