import { useEffect, useState } from "react";
import { Carousel, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Product from "../../models/Product";
import classes from "./ProductDetailsPage.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessageAlert from "../../components/ErrorMessageAlert/ErrorMessageAlert";
import AppError from "../../models/AppError";
import { AxiosError } from "axios";
import useProductsService from "../../services/productsService";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const { getProductById } = useProductsService();
  const [product, setProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AppError | undefined>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await getProductById(productId!);
        setProduct(product);
      } catch (error) {
        const e = error as AxiosError;
        setError({ message: e.response?.data as string });
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      getProduct();
    }
  }, [getProductById, productId]);

  const pageContent = isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <PageTitle title={product.name} />
      {product.images.length > 0 && (
        <Row>
          <Carousel slide={false}>
            {product.images?.map((imageUrl, i) => (
              <Carousel.Item key={i} style={{ textAlign: "center" }}>
                <Image
                  className={classes.image}
                  src={import.meta.env.VITE_API_URL + imageUrl}
                  rounded
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      )}
      <Row className={classes.details_section + " mt-5 mb-5"}>
        <h5>Price: ${product.price}</h5>
        <hr />
        {product.description && (
          <p className={classes.description}>{product.description}</p>
        )}
        <div className={classes.footer + " mt-5 text-center"}>
          <p>
            Posted @{" "}
            <strong>{new Date(product.postedAt).toDateString()}</strong>
          </p>
          <p>
            Seller email:{" "}
            <a href={`mailto:${product.ownerEmail}`}>{product.ownerEmail}</a>
          </p>
        </div>
      </Row>
    </>
  );

  return (
    <Container>
      {error ? <ErrorMessageAlert message={error.message} /> : pageContent}
    </Container>
  );
}
