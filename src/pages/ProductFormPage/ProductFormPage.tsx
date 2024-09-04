import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PageTitle from "../../components/PageTitle/PageTitle";
import { UserContext } from "../../contexts/userContext";
import classes from "./ProductFormPage.module.css";
import productsService from "../../services/productsService";
import ErrorMessageAlert from "../../components/ErrorMessageAlert/ErrorMessageAlert";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function ProductFormPage() {
  const { userId } = useContext(UserContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);

        const { name, price, description } =
          await productsService.getProductById(productId!);

        setName(name);
        setPrice(price.toString());
        setDescription(description ?? "");
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      getProduct();
    }
  }, [productId]);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setIsValidated(true);
      return;
    }

    try {
      setIsLoading(true);

      if (productId) {
        await productsService.updateProduct(
          productId,
          name,
          Number(price),
          description
        );

        navigate(`/products/${productId}`);
      } else {
        const newProduct = await productsService.createProduct(
          userId!,
          name,
          Number(price),
          description
        );
        navigate(`/products/${newProduct.id}`);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const submitBtnContent = productId ? (
    <>
      Save
      <span>
        <FaCheck />
      </span>
    </>
  ) : (
    <>
      Publish
      <span>
        <IoMdSend />
      </span>
    </>
  );

  const pageContent = isLoading ? (
    <LoadingSpinner />
  ) : (
    <Form
      noValidate
      validated={isValidated}
      onSubmit={(e) => onSubmitHandler(e)}
    >
      <div className="mb-3 text-center">
        <Button className={classes.submit_btn} type="submit" variant="primary">
          {submitBtnContent}
        </Button>
      </div>

      <Row>
        <Col>
          <FormInput
            required
            title="Product Name"
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col>
          <FormInput
            required
            title="Price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Col>
      </Row>
      <Row className={classes.description + " mt-3"}>
        <FormInput
          title="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Row>
      <Row className="mt-3">
        <ImageUpload
          onChange={(files) => setImages(files)}
          onImageDelete={(i) =>
            setImages((prev) => {
              const newImages = [...prev];
              newImages.splice(i, 1);
              return newImages;
            })
          }
        />
      </Row>
    </Form>
  );

  return (
    <Container>
      <PageTitle title="Add a Product" />
      {hasError ? <ErrorMessageAlert /> : pageContent}
    </Container>
  );
}
