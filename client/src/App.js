import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import ListOfPets from "./components/ListOfPets";
import AddPetForm from "./components/AddPetForm";
import RutaPrivada from "./components/RutaPrivada";
import Search from "./components/Search";
import Profile from "./components/Profile";
import ModalState from "./context/modal/modalState";
import AlertState from "./context/alert/alertState";
import AuthState from "./context/auth/authState";
import PetsState from "./context/pets/petsState";
import tokenAuth from './config/tokenAuth'

const token = localStorage.getItem('token');
if(token){
  // save user on refresh
  tokenAuth(token)
}

export default function App() {
  return (
    <div>
      <AlertState>
        <ModalState>
          <AuthState>
            <PetsState>
          <Header />
          <Router>
            <Routes>
              <Route exact path="/" element={<ListOfPets />} />
              <Route exact path="/user/:id" element={<Profile />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/add" element={<AddPetForm />} />
            </Routes>
          </Router>
            </PetsState>
          </AuthState>
        </ModalState>
      </AlertState>
    </div>
  );
}
