import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { UserContext } from "../../contexts/userContext";
import Product from "../../models/Product";
import classes from "./MyProductsPage.module.css";
import productsService from "../../services/productsService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import usersService from "../../services/usersService";
import ErrorMessageAlert from "../../components/ErrorMessageAlert/ErrorMessageAlert";

export default function MyProductsPage() {
  const { userId: user } = useContext(UserContext);
  const navigate = useNavigate();

  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const getUsersProducts = async () => {
      try {
        const products = await usersService.getUserProducts(user!.id);
        setMyProducts(products);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getUsersProducts();
  }, [user]);

  const onDeleteProductClickHandler = async (productId: number) => {
    try {
      setIsLoading(true);
      await productsService.deleteProduct(productId);

      setMyProducts((prev) => {
        return prev.filter((product) => product.id !== productId);
      });
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const pageContent = isLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
      {myProducts.length > 0 ? (
        <>
          <div className={classes.add_product_button_container}>
            <Link
              className={classes.add_product_button + " btn btn-primary"}
              to="/addProduct"
            >
              Add a Product
            </Link>
          </div>

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
        </>
      ) : (
        <div className={classes.no_products_message_container}>
          <p>You have not posted any products yet.</p>
          <Link className="btn btn-primary" to="/addProduct">
            Create a product post now
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <Container>
      <PageTitle title="My Products" />
      {hasError ? <ErrorMessageAlert /> : pageContent}
    </Container>
  );
}
