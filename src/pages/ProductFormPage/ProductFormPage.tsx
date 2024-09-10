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
import ErrorMessageAlert from "../../components/ErrorMessageAlert/ErrorMessageAlert";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { MdDelete } from "react-icons/md";
import useProductService from "../../services/productsService";

export default function ProductFormPage() {
  const { userId } = useContext(UserContext);
  const { productId } = useParams();
  const { getProductById, updateProduct, createProduct, deleteProductImage } =
    useProductService();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImagesFiles] = useState<File[]>([]);
  const [imagesPaths, setImagesPaths] = useState<string[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);

        const { name, price, description, images } = await getProductById(
          productId!
        );

        setName(name);
        setPrice(price.toString());
        setDescription(description ?? "");
        setImagesPaths(
          images.map((imagePath) => import.meta.env.VITE_API_URL + imagePath)
        );
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

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);

      if (imageFiles.length > 0) {
        imageFiles.forEach((imgFile) => formData.append("images", imgFile));
      }

      if (productId) {
        await updateProduct(productId, formData);

        navigate(`/products/${productId}`);
      } else {
        formData.append("ownerId", userId!);

        const newProduct = await createProduct(formData);
        navigate(`/products/${newProduct.id}`);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteImagePathClickHandler = async (imagePath: string) => {
    if (productId && imagePath) {
      try {
        setIsLoading(true);
        await deleteProductImage(productId, imagePath);
        setImagesPaths((prev) => prev.filter((x) => x != imagePath));
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onDeleteImageFileClickHandler = (fileIndex: number) => {
    setImagesFiles((prev) => {
      const newImages = [...prev];
      newImages.splice(fileIndex, 1);
      return newImages;
    });
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
      {productId && (
        <Row className={classes.image_gallery + " mt-3"}>
          {imagesPaths.map((path) => (
            <Col className={classes.image_container}>
              <img src={path} />
              <Button
                onClick={async () => await onDeleteImagePathClickHandler(path)}
                type="button"
                variant="danger"
                size="sm"
              >
                <MdDelete size={20} />
              </Button>
            </Col>
          ))}
        </Row>
      )}
      <Row className="mt-3">
        <ImageUpload
          labelText={productId && "Add new images to your product"}
          onChange={(files) => setImagesFiles(files)}
          onImageDelete={onDeleteImageFileClickHandler}
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
