import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<ProductsPage />} />
      <Route path="products/:productId" element={<ProductDetailsPage />} />
    </Route>

    <Route path="/account">
      <Route path="register" element={<SignUpPage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </>
);

const router = createBrowserRouter(routes);

export default router;
