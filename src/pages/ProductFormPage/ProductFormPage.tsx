import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import FormInput from "../../components/FormInput/FormInput";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import classes from "./ProductFormPage.module.css";

export default function ProductFormPage() {
  const [isValidated, setIsValidated] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setIsValidated(true);
      return;
    }
  };

  return (
    <Container>
      <Row>
        <h1 className="title mt-5 mb-5">Add a Product</h1>
      </Row>

      <Form noValidate validated={isValidated} onSubmit={onSubmitHandler}>
        <Row>
          <Col>
            <FormInput
              title="Product Name"
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <FormInput
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
