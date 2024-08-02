import { useCallback, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import dummyProducts from "../../dummyData/dummyProducts";
import Product from "../../models/Product";
import User from "../../models/User";

import CustomPagination from "../../components/CustomPagination/CustomPagination";
import classes from "./LandingPage.module.css";

//TODO: Products details page

const PRODUCTS_PER_PAGE = 3;

export default function LandingPage() {
  const { state } = useLocation();

  const [user] = useState<User>(state?.user);
  const [products, setProducts] = useState<Product[]>([...dummyProducts]);
  const [productsOnPage, setProductsOnPage] = useState<Product[]>(
    dummyProducts.slice(0, PRODUCTS_PER_PAGE)
  );
  const [activePage, setActivePage] = useState<number>(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const onPageChangeHandler = useCallback(
    (pageNumber: number) => {
      const start = (pageNumber - 1) * PRODUCTS_PER_PAGE;
      const end = start + PRODUCTS_PER_PAGE;

      setProductsOnPage(products.slice(start, end));
      setActivePage(pageNumber);
    },
    [products]
  );

  return user ? (
    <Container>
      <Row className={classes.title + " mt-5 mb-5"}>
        <h1>Welcome to the MERN Shop</h1>
      </Row>
      <Container>
        <ProductsGrid products={productsOnPage} />
        <CustomPagination
          activePage={activePage}
          totalPages={totalPages}
          onPageChange={onPageChangeHandler}
        />
      </Container>
    </Container>
  ) : (
    <Navigate to="/account/register" />
  );
}
