import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import PetsContext from '../context/pets/petsContext'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AuthContext from '../context/auth/authContext'
import Button from '@mui/material/Button';
import './style/PetSelected.css'

const PetSelected = () => {
    const { selected, allpets, savePet, adoptPet, unsavePet, fosterPet, unfosterPet, getOnePet, returnAdoptPet } = useContext(PetsContext);
    const { usuario } = useContext(AuthContext);
    const [mascota, setMascota] = useState('')
    const {id} = useParams();

    useEffect(() => {   
        getOnePet(id)  
       if(selected){
           setMascota(selected)
       }
    }, [selected, id, allpets])

    const onClickSave = id => {
        savePet({usuario: usuario._id, petId: id})
        getOnePet(id)
        setMascota(selected)

      }
      const onClickAdopt = id => {
        adoptPet({usuario: usuario._id, petId: id})
        getOnePet(id)
        setMascota(selected)
      }
      const onClickUnSave = id => {
        unsavePet({usuario: usuario._id, petId: id})
        getOnePet(id)
        setMascota(selected)
  
      }
      const onClickFoster = id => {
        fosterPet({usuario: usuario._id, petId: id})
        getOnePet(id)
        setMascota(selected)
      }
      const onClickUnfoster = id => {
        unfosterPet({usuario: usuario._id, petId: id})
        getOnePet(id)
        setMascota(selected)
      }
      const returnApodted = id => {
        returnAdoptPet({usuario: usuario._id, petId: id})
        getOnePet(id)
        setMascota(selected)
      }

    return ( 
        <div className="container_selected">
            <CssBaseline />
                <Container fixed>
                <h1 className="title">Say Hello to {mascota.name}!</h1>
           <div className='selected'>
               <img className="img-selected" src={mascota.picture} alt="" />
               <div className='selected_data'>
                   
                    <h3>Type: {mascota.type}</h3>
                    <h3>Status: {mascota.adoptionStatus ? 'Adopted ❤️' : "Need a house 🙏"}</h3>
                    <h3>Height: {mascota.height}</h3>
                    <h3>Weight: {mascota.weight}</h3>
                    <h3>Color: {mascota.color}</h3>
                    <h3>Hypoallergenic: {mascota.hypoallergenic ? 'Yes' : 'No'}</h3>
                    <h3>Dietary Restrictions: {mascota.dietaryRestrictions}</h3>
                    <h3>Breed: {mascota.breed}</h3>
                </div>
           </div>
           <div className="selected_btn">
           {usuario ? 
      (<div className="card-action">
        {!mascota.adoptionStatus ? 
        (<Button variant="outlined" color="warning" onClick={() => onClickAdopt(mascota._id)}>ADOPT ME</Button>)
        :(<>{mascota.adopted.toString().includes(usuario._id) ? (<Button variant="outlined" color="error" onClick={() => returnApodted(mascota._id)}>RETURN ADOPTED PET</Button>) : null }</>)}

        {mascota.adoptionStatus ? null : (<>{mascota.foster && mascota.foster.toString().includes(usuario._id) ? 
        (<Button variant="outlined" color="error" onClick={() => onClickUnfoster(mascota._id)}>RETURN FOSTER PET</Button>)
         : (<Button variant="outlined" color="success" onClick={() => onClickFoster(mascota._id)}>FOSTER</Button>)}</>)}

        {mascota.saved && mascota.saved.toString().includes(usuario._id) ? 
        (<Button variant="outlined" color="error" onClick={() => onClickUnSave(mascota._id)}>UNSAVE</Button>) : 
        (<Button variant="outlined" color="success" onClick={() => onClickSave(mascota._id)}>SAVE {mascota.name}</Button>)}
      </div>) : 
      (<div>
        <h3>Give {mascota.name} a 🏠, Log in!</h3>
      </div>)
      }
           </div>
           </Container>
        </div>
     );
}
 
export default PetSelected;