import React, {useState} from 'react'
import ModalContext from './modalContext'
// import clienteAxios from '../../config/axios'

    
const ModalState = props => {
const [open, setOpen] = useState(false)

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

    return(
        <ModalContext.Provider
            value={{
                open,
                // logIn,
                // signUp,
                // setLogIn,
                // setSignUp,
                handleOpen,
                handleClose,
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )

}

export default ModalState

