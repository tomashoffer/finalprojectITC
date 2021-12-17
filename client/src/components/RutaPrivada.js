import React, {useContext, useEffect} from 'react';
import { Route, Navigate } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

const RutaPrivada = ({ Component, ...props }) => {
      // Extraer info de authentication
  const authContext = useContext(AuthContext);
  const { authenticate, cargando, usuarioAutenticado } = authContext;

  useEffect(() => {
    // mantenemos la data del usuario al hacer refresh
    usuarioAutenticado();
    // eslint-disable-next-line
  }, [usuarioAutenticado]);

    return ( 
        <Route { ...props } render={ props => !authenticate && !cargando
            ? (<Navigate to='/' />) 
            : (<Component {...props} />)}
        
        />
     );
}
 
export default RutaPrivada;
