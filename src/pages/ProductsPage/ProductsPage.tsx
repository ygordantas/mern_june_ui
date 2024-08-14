import { useCallback, useMemo, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import PageTitle from "../../components/PageTitle/PageTitle";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import dummyProducts from "../../dummyData/dummyProducts";
import Product from "../../models/Product";
import classes from "./ProductsPage.module.css";

const PRODUCTS_PER_PAGE = 3;

export default function ProductsPage() {
  const [products] = useState<Product[]>(
    [...dummyProducts].sort((a, b) => b.postedAt - a.postedAt)
  );
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

  return (
    <Container>
      <PageTitle title="Welcome to the MERN Shop" />
      <Row>
        <Col className="mb-3">
          <Link
            className={classes.add_product + " btn btn-primary"}
            to="/addProduct"
          >
            Add a Product
          </Link>
        </Col>
        <Col className="mb-3">
          <InputGroup>
            <Form.Control
              placeholder="Search"
              aria-label="Search Products"
              aria-describedby="Search Products"
            />
            <Button className={classes.search_btn} variant="primary">
              <FaSearch />
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
  );
}
