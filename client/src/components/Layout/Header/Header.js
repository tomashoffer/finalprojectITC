import React, { useContext } from "react";
import ModalAuth from "../../modals/ModalAuth";
import BurgerMenu from "../BurgerMenu";
import AuthContext from "../../../context/auth/authContext";
import logo from "../../../img/logo.svg";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "./Header.css";

const Header = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="container_header" style={{ background:'#F5B000'}}>
      <CssBaseline />
      <Container>
        <header className="app-header">
          <div className="header-menu">
            <BurgerMenu />
          </div>
          <div className="header-usuario">
            {usuario ? (
              <h2 className="nombre-usuario">
                <span>WELCOME</span> {usuario.name.toUpperCase()}!
              </h2>
            ) : (
              <h2>WELCOME!</h2>
            )}
          </div>
          <div className="header-div">
            <h2 className="header-title">
              My Favorite Breed is{" "}
              <span style={{ color: "black" }}>ADOPTED</span>
            </h2>
            <img className="header-img" src={logo} alt="" />
          </div>
          <div className="header-modal">
            <ModalAuth />
          </div>
        </header>
      </Container>
    </div>
  );
};

export default Header;
