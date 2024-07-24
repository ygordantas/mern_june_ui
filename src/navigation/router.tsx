import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const routes = createRoutesFromElements(
  <>
    <Route path="/register" element={<SignUpPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<LandingPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </>
);

const router = createBrowserRouter(routes);

export default router;
