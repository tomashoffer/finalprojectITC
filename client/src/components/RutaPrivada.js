import React, {useContext, useEffect} from 'react';
import { Outlet, Navigate } from "react-router";
import AuthContext from '../context/auth/authContext'

const RutaPrivada = () => {
      // Extraer info de authentication
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, cargando, authenticate } = authContext;

  useEffect(() => {
    // mantenemos la data del usuario al hacer refresh
    usuarioAutenticado();
    // eslint-disable-next-line
  }, [usuarioAutenticado]);

  return !authenticate && !cargando ? <Navigate to="/404"/> : <Outlet />;
}
 
export default RutaPrivada;
