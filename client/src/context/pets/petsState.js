import React, { useReducer, useState } from 'react';
import PetsReducer from './petsReducer';
import PetsContext from './petsContext';
import clienteAxios from '../../config/axios';

import {GET_ALL_PETS, GET_ONE_PET, ADD_PET, DELETE_PET, UPDATE_PET, SEARCH_PET, ADOPT_PET, SAVE_PET, UNSAVE_PET, FOSTER_PET, UNFOSTER_PET, ERROR_PETS, GET_FOSTER_PET, GET_ADOPTED_PET, GET_SAVED_PET} from '../../types'

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
    
    const [idSelected, setIdSelected] = useState('');
    //Modal states
    const [openUpdatePet, setOpenUpdatePet] = useState(false);
    const handleOpenUpdatePet = () => setOpenUpdatePet(true);
    const handleCloseUpdatePet = () => setOpenUpdatePet(false);
    const [openSeePets, setOpenSeePets] = React.useState(false);
    const handleOpenSeePets = () => setOpenSeePets(true);
    const handleCloseSeePets = () => setOpenSeePets(false);

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
    const updatePets = async datos => {
        try {
            const respuesta = await clienteAxios.put('/pets/update', datos)
            dispatch({
                type: UPDATE_PET,
                payload: respuesta.data.pets
            });
        } catch (error) {
            dispatch({
                type: ERROR_PETS,
                payload: error
            })
        }
    }
    const deletePet = async datos => {
        try {
            console.log(datos)
            const respuesta = await clienteAxios.post('/pets/delete', {petId: datos.petId, usuario: datos.user})
            dispatch({
                type: DELETE_PET,
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
    const getAdoptedPets = async id => {
        try {
           
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
    const getFosterPets = async id => {
        try {
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
    const getSavedPets = async id => {
        try { 
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
            idSelected,
            setIdSelected,
            getAllPets,
            getOnePet,
            addNewPet, 
            updatePets,
            deletePet,
            searchPet,
            adoptPet,
            savePet,
            returnAdoptPet,
            unsavePet,
            fosterPet,
            unfosterPet,
            getAdoptedPets,
            getFosterPets,
            getSavedPets,
            openUpdatePet,
            handleOpenUpdatePet,
            handleCloseUpdatePet,
            openSeePets,
            handleOpenSeePets,
            handleCloseSeePets
        }}
        >
            {props.children}
        </PetsContext.Provider>
    )
}

export default PetsState