import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import ListOfPets from "./components/ListOfPets";
import AddPetForm from "./components/AddPetForm";
import RutaPrivada from "./components/RutaPrivada";
import PetSelected from "./components/PetSelected";
import Dashboard from "./components/Dashboard";
import Search from "./components/Search";
import MyOunPets from "./components/MyOunPets";
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
              <Route exact path="/user/:id" element={<MyOunPets />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/add" element={<AddPetForm />} />
              <Route exact path="/pet/:id" element={<PetSelected />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
            </PetsState>
          </AuthState>
        </ModalState>
      </AlertState>
    </div>
  );
}
