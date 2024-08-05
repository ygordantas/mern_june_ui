import { useCallback, useMemo, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link, Navigate, useLocation } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import dummyProducts from "../../dummyData/dummyProducts";
import Product from "../../models/Product";
import User from "../../models/User";

const PRODUCTS_PER_PAGE = 3;

export default function ProductsPage() {
  const { state } = useLocation();

  const [user] = useState<User>(state?.user);
  const [products] = useState<Product[]>([...dummyProducts]);
  const [productsOnPage, setProductsOnPage] = useState<Product[]>(
    dummyProducts.slice(0, PRODUCTS_PER_PAGE)
  );
  const [activePage, setActivePage] = useState<number>(1);

  const totalPages = useMemo(
    () => Math.ceil(products.length / PRODUCTS_PER_PAGE),
    [products.length]
  );

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
      <Row className="title mt-5 mb-5">
        <h1>Welcome to the MERN Shop</h1>
      </Row>
      <Row>
        <Col className="mb-3" xs={12} md={4}>
          <Link
            className="btn btn-light"
            style={{ marginLeft: "20px" }}
            to="/products/new"
          >
            Add Product
          </Link>
        </Col>
        <Col className="mb-3" md={{ span: 4, offset: 4 }}>
          <InputGroup>
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button
              style={{ marginRight: "20px" }}
              variant="secondary"
              id="button-addon2"
            >
              Search
            </Button>
          </InputGroup>
        </Col>
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
