import React, {useState} from 'react';
import alertContext from './alertContext';


const AlertaState = props => {

    const [alerta, setAlerta] = useState(null)

    const mostrarAlerta = (msg, categoria)=>{
      setAlerta({msg, categoria})
        setTimeout(()=>{
          setAlerta(null) 
        }, 5000)
    }

    return(
        <alertContext.Provider
        value={{
            alerta,
            mostrarAlerta
        }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertaState