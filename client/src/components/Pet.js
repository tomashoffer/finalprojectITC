import React, {useState, useContext, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Spinner from './Layout/Spinner/Spinner'
import './style/Pet.css'
import PetsContext from '../context/pets/petsContext'


const Pet = () => {
    const { getAllPets, allpets } = useContext(PetsContext);
    const [mascotas, setMascotas] = useState([])
    const [spinner, setSpinner] = useState(false) 


    useEffect(() => {
      if(allpets){
        getAllPets()
      setMascotas(allpets)
      }
      else{
        setSpinner(true)
        setTimeout(()=>{
        setSpinner(false)
        }, 1000)
      }
      // eslint-disable-next-line
    }, [setMascotas, allpets, getAllPets, mascotas, setSpinner])



    return ( 
      <>
      
     {spinner ? (<div><Spinner/></div>) : 
     
     (<div> 
     <CssBaseline />
      <Container fixed>
        <div className="card-pets">

    
  {mascotas.map((item) => (
      <Card sx={{ maxWidth: 345 }} style={{marginBottom: "30px"}}>
      <CardMedia
        component="img"
        height="140"
        image={item.picture}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Type: {item.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Bio: {item.bio}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Breed: {item.breed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        State: {item.adoptionStatus}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">ADOPT PET</Button>
        <Button size="small">SAVE</Button>
      </CardActions>
    </Card>
  ))}

        </div>
   </Container>
   </div>)}
   </>
     );
}
 
export default Pet;