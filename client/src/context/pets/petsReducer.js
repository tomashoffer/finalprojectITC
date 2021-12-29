import {GET_ALL_PETS, GET_ONE_PET, ADD_PET, SEARCH_PET, UPDATE_PET, DELETE_PET, GET_FOSTER_PET, GET_ADOPTED_PET, GET_SAVED_PET} from '../../types'

export default (state, action) => {
    switch (action.type) {
            case GET_ALL_PETS:
            case UPDATE_PET:
            case  ADD_PET:
            case  DELETE_PET:
        return {
            ...state,
            allpets: action.payload
        }
            case  GET_ONE_PET:
        return {
            ...state,
            selected: action.payload
        }
            case  GET_ADOPTED_PET:
        return {
            ...state,
            adopt: action.payload
        }
            case  GET_SAVED_PET:
        return {
            ...state,
            saved: action.payload
        }
            case  GET_FOSTER_PET:
        return {
            ...state,
            foster: action.payload
        }
   
            case  SEARCH_PET:
        return {
            ...state,
            searchState: action.payload
        }
        default:
            return state;
    }
}