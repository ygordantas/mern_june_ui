import { useCallback, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import dummyProducts from "../../dummyData/dummyProducts";
import Product from "../../models/Product";

const PRODUCTS_PER_PAGE = 3;

export default function ProductsPage() {
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

  return (
    <Container>
      <Row className="title mt-5 mb-5">
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
  );
}
