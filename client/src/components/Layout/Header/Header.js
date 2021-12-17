import React, { useState, useContext } from "react";
import Modal from "../../Modal";
import BurgerMenu from "../BurgerMenu"
import AuthContext from '../../../context/auth/authContext'
import logo from "../../../img/logo.svg"
import './Header.css'

const Header = () => {
  const { usuario } =
  useContext(AuthContext);

  return (

    <header className="app-header">
      <div className="header-menu">
      <BurgerMenu/>
      </div>
      <div className="header-div">
        <h2 className="header-title">My Favorite Breed is <span style={{color: "black"}}>ADOPTED</span></h2>
        <img className="header-img" src={logo} alt=""/>
      </div>
      <div className='header-usuario'>
        {usuario ? (<h2 className="nombre-usuario">WELCOME {usuario.name.toUpperCase()}!</h2>) : null} 
      </div>
      <div className="header-modal">
        <Modal/> 
      </div>
    </header>
  );
};

export default Header;
