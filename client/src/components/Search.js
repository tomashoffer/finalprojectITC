import React, {useState, useContext, useEffect} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import PetsContext from '../context/pets/petsContext'
import Spinner from './Layout/Spinner/Spinner'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const Search = () => {

    const [advance, setAdvance] = useState(true)
    const [mascotas, setMascotas] = useState([])
    const [spinner, setSpinner] = useState(false) 
    const [search, setSearch] = useState({
        name: "",
        type: "",
        adoptionStatus: null,
        height: "",
        weight: "",
      })
      const { searchPet, searchState } = useContext(PetsContext);

      useEffect(() => {
        if(searchState){
        setMascotas(searchState)
        }
        else{
          setSpinner(true)
          setTimeout(()=>{
          setSpinner(false)
          }, 1000)
        }
        // eslint-disable-next-line
      }, [setMascotas, searchState])

    const OnChange = (e) => {
        setSearch({
          ...search,
          [e.target.name]: e.target.value,
        });
      };

      const onSubmit = (e) => {
    e.preventDefault();
    const newSearch = {
        name: search.name,
        type: search.type,
        adoptionStatus: search.adoptionStatus,
        height: search.height,
        weight: search.weight,
    }
    searchPet(newSearch);
  };


    return ( 
        <div>
            <h1>Search</h1>
            <div>
                <form onSubmit={onSubmit}>
                <CssBaseline />
                <Container fixed>   
                {advance ? 
                (<div>
        <div className='form-grid'>
          <div>
          <Form.Select onChange={OnChange} className="search-input" name="adoptionStatus" aria-label="Default select example">
        <option>Adoption Status:</option>
        <option value={true}>Adopted</option>
        <option value={false}>Need a house</option>
        </Form.Select>
        <Form.Control onChange={OnChange} className="search-input" value={search.name} name="name" size="lg" type="text" placeholder="Name" />
        <Form.Control onChange={OnChange} className="search-input" value={search.type} name="type" size="lg" type="text" placeholder="Type" />
        <Form.Control onChange={OnChange} className="search-input" value={search.height} name="height" size="lg" type="text" placeholder="Height" />
        <Form.Control onChange={OnChange} className="search-input" value={search.weight} name="weight"  size="lg" type="text" placeholder="Weight" />
        </div>
    </div>
        <Button className="btn-submit" type='submit' variant="contained" color="success">
        Search Pet
      </Button>
                </div>) : 
                (<div>
                    <Form.Control onChange={OnChange} className="search-input" value={search.type} name="type" size="lg" type="text" placeholder="Type" />
                </div>)}
                </Container>
                </form>
            </div>
    
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
        </div>
     );
}
 
export default Search;