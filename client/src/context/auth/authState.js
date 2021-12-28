import React, { useReducer, useState, useContext } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import ModalContext from "../modal/modalContext";
import swal from "sweetalert";

import {REGISTRO_EXITOSO, 
    REGISTRO_ERROR, 
    OBTENER_USUARIO, 
    LOGIN_EXITOSO, 
    LOGIN_ERROR,
    GET_ALL_USERS,
    UPDATE_USER, 
    DELETE_USER,
    CERRAR_SESION} from '../../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticate: null,
        usuario: null,
        mensaje: null,
        cargando: true,
        allusers: '',
    }
    const [idUserSelected, setIdUserSelected] = useState('');
    const [openUpdateUser, setOpenUpdateUser] = useState(false);
    const handleOpenUpdateUser = () => setOpenUpdateUser(true);
    const handleCloseUpdateUser = () => setOpenUpdateUser(false);
    const [ state, dispatch ] = useReducer(AuthReducer, initialState)
    const { handleClose } = useContext(ModalContext);

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
            handleClose()
            swal("Hello again!", "Log In successfully!", "success");
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
    const getAllUsers = async () => {
        try {
            const respuesta = await clienteAxios.get('/users/allusers')
            dispatch({
                type: GET_ALL_USERS, 
                payload: respuesta.data
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error
            });
        }
    }
    const updateUsers = async datos => {
        try {
            const respuesta = await clienteAxios.put('/users/update', 
                {id: datos.id, 
                usuario: datos.user,  
                name: datos.name,
                phone: datos.phone,
                email: datos.email,
                role: datos.role,})
            dispatch({
                type: UPDATE_USER, 
                payload: respuesta.data.user
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error
            });
        }
    }
    const deleteUser = async datos => {
        try {
            const respuesta = await clienteAxios.post('/users/delete', {id: datos.id, usuario: datos.user})
            dispatch({
                type: DELETE_USER, 
                payload: respuesta.data.user
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error
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
            allusers: state.allusers,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            getAllUsers,
            cerrarSesion,
            openUpdateUser,
            handleOpenUpdateUser,
            handleCloseUpdateUser,
            idUserSelected,
            setIdUserSelected,
            updateUsers,
            deleteUser
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState