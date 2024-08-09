import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { RiAuctionFill } from "react-icons/ri";
import { TbMessages } from "react-icons/tb";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import classes from "./Layout.module.css";

export default function Layout() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const onLogoutClickHandler = () => {
    setUser(undefined);
    navigate("/account/login");
  };

  return user ? (
    <div className={classes.page_container}>
      <Navbar expand="lg" className={classes.navbar}>
        <Container fluid>
          <Link to="/">
            <img
              src="/src/assets/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="MERN Shop logo"
            />
          </Link>

          <Navbar.Toggle
            className={classes.toggle}
            aria-controls="basic-navbar-nav"
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={classes.nav_item_container + " me-auto"}>
              <NavLink to="/myProducts">
                <RiAuctionFill />
                My Products
              </NavLink>
              <NavLink to="/messages">
                <TbMessages /> Messages
              </NavLink>
            </Nav>
            <Nav className={classes.nav_item_container}>
              <NavLink to="/settings">
                <IoSettings /> Settings
              </NavLink>
              <button onClick={onLogoutClickHandler}>
                <IoLogOut /> Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Outlet />
      </Container>
    </div>
  ) : (
    <Navigate to="/account/login" />
  );
}
