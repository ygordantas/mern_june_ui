import { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { UserContext } from "../../contexts/userContext";
import dummyProducts from "../../dummyData/dummyProducts";
import Product from "../../models/Product";
import classes from "./MyProductsPage.module.css";

export default function MyProductsPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [myProducts, setMyProducts] = useState<Product[]>(
    dummyProducts.filter((p) => p.postedBy === user?.email)
  );

  const onDeleteProductClickHandler = (productId: string) => {
    const productIndex = dummyProducts.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return;
    }

    dummyProducts.splice(productIndex, 1);

    setMyProducts(dummyProducts.filter((p) => p.postedBy === user?.email));
  };

  return (
    <Container>
      <PageTitle title="My Products" />
      <div>
        <ul className={classes.list}>
          {myProducts.map((product) => (
            <li key={product.id}>
              <div className={classes.product_info}>
                <img
                  className={classes.image}
                  src={product.images[0]}
                  alt={`Image for product ${product.name}`}
                />
                <div className={classes.product_info_text_container}>
                  <p>
                    Product name: <strong>{product.name}</strong>
                  </p>
                  <p>
                    Asking price: <strong>${product.price}</strong>
                  </p>
                </div>
              </div>

              <div className={classes.buttons_container}>
                <Button
                  onClick={() => navigate(`/addProduct/${product.id}`)}
                  variant="info"
                  title="Edit"
                >
                  <MdEdit />
                </Button>
                <Button
                  onClick={() => onDeleteProductClickHandler(product.id)}
                  variant="danger"
                  title="Delete"
                >
                  <MdDeleteForever />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
