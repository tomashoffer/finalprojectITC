import {GET_ALL_PETS, GET_ONE_PET, ADD_PET, EDIT_PET, DELETE_PET} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case GET_ALL_PETS:
        return {
            ...state,
            allpets: action.payload
        }
      
        case  ADD_PET:
        return {
            ...state,
            allpets: action.payload
        }
      
   
        default:
            return state;
    }
}