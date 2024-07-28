import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import Layout from "../components/Layout/Layout";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<LandingPage />} />
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
