import React, { useReducer, useEffect } from 'react';
import PetsReducer from './petsReducer';
import PetsContext from './petsContext';
import clienteAxios from '../../config/axios';

import {GET_ALL_PETS, GET_ONE_PET, ADD_PET, EDIT_PET, DELETE_PET, SEARCH_PET, ERROR_PETS} from '../../types'

const PetsState = props => {
    const initialState = {
       allpets: '',
       pet: '',
       saved: '',
       adopt: '',
       searchState: ''
    }

    const [ state, dispatch ] = useReducer(PetsReducer, initialState)

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
            console.log(respuesta)
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

    
    useEffect(() => {
        getAllPets()
    })
  
    return(
        <PetsContext.Provider
        value={{
            allpets: state.allpets,
            searchState: state.searchState,
            getAllPets,
            addNewPet, 
            searchPet,
        }}
        >
            {props.children}
        </PetsContext.Provider>
    )
}

export default PetsState