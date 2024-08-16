import { useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../../models/Product";
import classes from "./ProductsGrid.module.css";

interface ProductsGridProps {
  products: Product[];
  itemsPerRow?: number;
}

export default function ProductsGrid({
  products,
  itemsPerRow = 3,
}: ProductsGridProps) {
  const totalRowsCount = Math.ceil(products.length / itemsPerRow);

  const createGrid = useCallback((): JSX.Element[] => {
    const grid: JSX.Element[] = [];

    let rowNumber = 1;
    let sliceStarIndex = 0;

    while (rowNumber <= totalRowsCount) {
      const productsInRow = products.slice(
        sliceStarIndex,
        sliceStarIndex + itemsPerRow
      );

      grid.push(
        <Row key={rowNumber}>
          {productsInRow.map((product, i) => (
            <Col sm={12} md={4} className="mb-3" key={`${rowNumber}_${i}`}>
              <Card className={classes.card}>
                <Card.Img variant="top" src={product.images[0]} />
                <Card.Body className={classes.card_body}>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>${product.price}</strong>
                  </Card.Text>
                  <Link
                    className="btn btn-secondary"
                    to={`/products/${product.id}`}
                  >
                    Check it out!
                  </Link>
                </Card.Body>
                <Card.Footer className={classes.footer + " text-muted"}>
                  Posted @ {new Date(product.postedAt).toDateString()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      );

      rowNumber++;
      sliceStarIndex += itemsPerRow;
    }

    return grid;
  }, [totalRowsCount, products, itemsPerRow]);

  return totalRowsCount ? (
    createGrid()
  ) : (
    <Row>
      <p>No products found</p>
    </Row>
  );
}
