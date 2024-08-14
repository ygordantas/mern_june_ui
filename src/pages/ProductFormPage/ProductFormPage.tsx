import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PageTitle from "../../components/PageTitle/PageTitle";
import { UserContext } from "../../contexts/userContext";
import dummyProducts from "../../dummyData/dummyProducts";
import Product from "../../models/Product";
import classes from "./ProductFormPage.module.css";

export default function ProductFormPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = dummyProducts.find(
    (p) => p.id === productId && p.postedBy === user?.email
  );

  const [isValidated, setIsValidated] = useState(false);
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");
  const [images, setImages] = useState<File[]>([]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setIsValidated(true);
      return;
    }

    const newProduct: Product = {
      id: String(dummyProducts.length + 1),
      name,
      price: Number(price),
      postedBy: user!.email,
      postedAt: new Date(),
      description,
      images:
        images.length > 0
          ? images.map((file) => URL.createObjectURL(file))
          : ["https://placehold.co/600x400"],
    };

    dummyProducts.push(newProduct);

    navigate(`/products/${newProduct.id}`);
  };

  const submitBtnContent = product ? (
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

  return (
    <Container>
      <PageTitle title="Add a Product" />
      <Form noValidate validated={isValidated} onSubmit={onSubmitHandler}>
        <div className="mb-3 text-center">
          <Button
            className={classes.submit_btn}
            type="submit"
            variant="primary"
          >
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
    </Container>
  );
}
