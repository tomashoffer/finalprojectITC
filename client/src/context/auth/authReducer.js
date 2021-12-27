import {REGISTRO_EXITOSO, 
    REGISTRO_ERROR, 
    OBTENER_USUARIO, 
    LOGIN_EXITOSO, 
    LOGIN_ERROR,
    UPDATE_USER,
    GET_ALL_USERS,
    DELETE_USER, 
    CERRAR_SESION}from '../../types'

export default (state, action) => {
    switch (action.type) {
 
        case REGISTRO_EXITOSO:
            case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token)
        return {
           ...state,
           authenticate: true, 
           mensaje: null,
           cargando: false,
        }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token')
        return {
            ...state,
            token: null, 
            usuario: null,
            authenticate: null,
            mensaje: action.payload,
            cargando: false,
        }
        case OBTENER_USUARIO:
        return {
            ...state,
            authenticate: true,
            usuario: action.payload,
            cargando: false
        }
      
        case GET_ALL_USERS:
        case UPDATE_USER:
        case DELETE_USER:
        return {
            ...state,
            allusers: action.payload
        }
        default:
            return state;
    }
}