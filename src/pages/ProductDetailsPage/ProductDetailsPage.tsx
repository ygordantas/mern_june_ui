import { useState } from "react";
import { Carousel, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import dummyProducts from "../../dummyData/dummyProducts";
import Product from "../../models/Product";
import classes from "./ProductDetailsPage.module.css";

export default function ProductDetailsPage() {
  const { productId } = useParams();

  const [product] = useState<Product | undefined>(
    dummyProducts.find((p) => p.id === productId)
  );

  return product ? (
    <Container>
      <PageTitle title={product.name} />
      <Row>
        <Carousel slide={false}>
          {product.images.map((imageUrl, i) => (
            <Carousel.Item key={i} style={{ textAlign: "center" }}>
              <Image className={classes.image} src={imageUrl} rounded />
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
      <Row className={classes.details_section + " mt-5 mb-5"}>
        <h5>Price: ${product.price}</h5>
        <hr />
        {product.description && (
          <p className={classes.description}>{product.description}</p>
        )}
        <div className={classes.footer + " mt-5 text-center"}>
          <p>
            Posted @ <strong>{product.postedAt.toDateString()}</strong>
          </p>
          <p>
            Seller email:{" "}
            <a href={`mailto:${product.postedBy}`}>{product.postedBy}</a>
          </p>
        </div>
      </Row>
    </Container>
  ) : (
    <div>
      <strong>Product with id of {productId} was not found.</strong>
    </div>
  );
}
