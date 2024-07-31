import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import Product from "../../models/Product";
import User from "../../models/User";
import classes from "./LandingPage.module.css";

//TODO: Add Pagination

export default function LandingPage() {
  const { state } = useLocation();
  const [user] = useState<User>(state?.user);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Product 1",
      price: 100,
      postedBy: "User@email.com",
      postedAt: new Date(),
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1684445034959-b3faeb4597d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHRhYmxlfGVufDB8fDB8fHww",
    },
    {
      id: "2",
      name: "Product 2",
      price: 200,
      postedBy: "User2@email.com",
      postedAt: new Date(),
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1705937171534-def8d344cf6b?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      name: "Product 3",
      price: 300,
      postedBy: "anotny@email.com",
      postedAt: new Date(),
      description: "This is a description",
      imageUrl:
        "https://images.unsplash.com/photo-1459603677915-a62079ffd002?q=80&w=2134&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      name: "Product 4",
      price: 10.99,
      postedBy: "anotny@email.com",
      postedAt: new Date(),
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1667251760504-096946b820af?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "5",
      name: "Product 5",
      price: 3.15,
      postedBy: "anotny@email.com",
      postedAt: new Date(),
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  return user ? (
    <Container>
      <Row className={classes.title + " mt-5 mb-5"}>
        <h1>Welcome to the MERN Shop</h1>
      </Row>
      <ProductsGrid products={products} />
    </Container>
  ) : (
    <Navigate to="/account/register" />
  );
}
