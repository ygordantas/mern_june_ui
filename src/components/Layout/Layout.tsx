import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { RiAuctionFill } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router-dom";

import { IoLogOut, IoSettings } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";
import classes from "./Layout.module.css";

export default function Layout() {
  const [theme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""
  );

  return (
    <div data-theme={theme} className={classes.page_container}>
      <Navbar expand="lg" className={classes.navbar}>
        <Container>
          <Link to="/">
            <img
              src="/src/assets/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="MERN Shop logo"
            />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={classes.nav_item_container + " me-auto"}>
              <NavLink to="/shop">
                <CiShoppingCart />
                Shop
              </NavLink>
              <NavLink to="/posts">
                <RiAuctionFill />
                My Posts
              </NavLink>
              <NavLink to="/messages">
                <TbMessages /> Messages
              </NavLink>
            </Nav>
            <Nav className={classes.nav_item_container}>
              <NavLink to="/settings">
                <IoSettings /> Settings
              </NavLink>
              <Link to="/account/login">
                <IoLogOut /> Logout
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Outlet />
      </Container>
    </div>
  );
}
