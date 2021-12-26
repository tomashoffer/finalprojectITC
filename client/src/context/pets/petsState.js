import React, { useReducer, useEffect, useContext } from 'react';
import PetsReducer from './petsReducer';
import PetsContext from './petsContext';
import clienteAxios from '../../config/axios';
import AuthContext from '../auth/authContext'

import {GET_ALL_PETS, GET_ONE_PET, ADD_PET, EDIT_PET, DELETE_PET, SEARCH_PET, ADOPT_PET, SAVE_PET, UNSAVE_PET, FOSTER_PET, UNFOSTER_PET, ERROR_PETS, GET_FOSTER_PET, GET_ADOPTED_PET, GET_SAVED_PET} from '../../types'

const PetsState = props => {
    const initialState = {
       allpets: '',
       pet: '',
       saved: '',
       adopt: '',
       foster: '',
       selected: '',
       searchState: ''
    }

    const [ state, dispatch ] = useReducer(PetsReducer, initialState)
    const { usuario } = useContext(AuthContext);
    
    const getAllPets = async () => {
        try {
            // get user
            const respuesta = await clienteAxios.get('/pets')
            dispatch({
                type: GET_ALL_PETS, 
                payload: respuesta.data.pets
            })
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }
    const getOnePet = async id => {
        try {
            // get user
            const respuesta = await clienteAxios.post(`/pets/getpet`, {id: id})
            dispatch({
                type: GET_ONE_PET, 
                payload: respuesta.data.pets
            })
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }

    const addNewPet = async datos => {
        try {
            const respuesta = await clienteAxios.post('/pets', datos)
            dispatch({
                type: ADD_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }
    const searchPet = async datos => {
        try {
            const respuesta = await clienteAxios.get('/pets/search/', {params: {datos}})
            dispatch({
                type: SEARCH_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }

    const adoptPet = async datos => {
        try {
            console.log(datos)
            const respuesta = await clienteAxios.post('/pets/user/adopt', datos)
            dispatch({
                type: ADOPT_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }
    const returnAdoptPet = async datos => {
        try {
            const respuesta = await clienteAxios.post('/pets/user/returnAdopt', datos)
            dispatch({
                type: UNSAVE_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }
    const savePet = async datos => {
        try {
            const respuesta = await clienteAxios.post('/pets/user/saved', datos)
            dispatch({
                type: SAVE_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }
    const unsavePet = async datos => {
        try {
            const respuesta = await clienteAxios.post('/pets/user/unsave', datos)
            dispatch({
                type: UNSAVE_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }

   
    const fosterPet = async datos => {
        try {
            const respuesta = await clienteAxios.post('/pets/user/foster', datos)
            dispatch({
                type: FOSTER_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }

   
    const unfosterPet = async datos => {
        try {
            const respuesta = await clienteAxios.post('/pets/user/unfoster', datos)
            dispatch({
                type: UNFOSTER_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }
    const getAdoptedPets = async () => {
        try {
            const id = usuario._id
            const respuesta = await clienteAxios.post('/pets/user/getAdopt', {id: id})
            dispatch({
                type: GET_ADOPTED_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }
    const getFosterPets = async () => {
        try {
             const id = usuario._id
            const respuesta = await clienteAxios.post('/pets/user/getFoster', {id: id})
            dispatch({
                type: GET_FOSTER_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }
    const getSavedPets = async () => {
        try {
            const id = usuario._id
            console.log("saved", id)
            const respuesta = await clienteAxios.post('/pets/user/getSaved', {id: id})
            dispatch({
                type: GET_SAVED_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }

    return(
        <PetsContext.Provider
        value={{
            allpets: state.allpets,
            searchState: state.searchState,
            adopt: state.adopt,
            saved: state.saved,
            foster: state.foster,
            selected: state.selected,
            getAllPets,
            getOnePet,
            addNewPet, 
            searchPet,
            adoptPet,
            savePet,
            returnAdoptPet,
            unsavePet,
            fosterPet,
            unfosterPet,
            getAdoptedPets,
            getFosterPets,
            getSavedPets
        }}
        >
            {props.children}
        </PetsContext.Provider>
    )
}

export default PetsState