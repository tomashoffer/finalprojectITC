import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {REGISTRO_EXITOSO, 
    REGISTRO_ERROR, 
    OBTENER_USUARIO, 
    LOGIN_EXITOSO, 
    LOGIN_ERROR, 
    CERRAR_SESION}from '../../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticate: null,
        usuario: null,
        mensaje: null,
        cargando: true,
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState)

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/users', datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });
            // Obtener usuario 
            usuarioAutenticado()
        } catch (error) {
            console.log(error)
            // esto viene del backend
            const alerta = {
                msg: error.response.data.msg, 
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }
    // Retorna usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
            // pasamos el token al header
            tokenAuth(token)
        }
        try {
            // get user
            const respuesta = await clienteAxios.get('/auth')
            console.log(respuesta.data.usuario)
            dispatch({
                type: OBTENER_USUARIO, 
                payload: respuesta.data.usuario
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
            })
        }
    }
    // cuando el usuario inicia sesion 
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/auth', datos)
            dispatch({
                type: LOGIN_EXITOSO, 
                payload: respuesta.data
            })
            // Obtener usuario 
            usuarioAutenticado()
        } catch (error) {
            console.log(error)
            //esto viene del backend
            const alerta = {
                msg: error.response.data.msg, 
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    const cerrarSesion = async () => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    return(
        <AuthContext.Provider
        value={{
            token: state.token,
            authenticate: state.authenticate,
            usuario: state.usuario,
            mensaje: state.mensaje,
            cargando: state.cargando,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState