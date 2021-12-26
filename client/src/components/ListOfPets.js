import React, {useState, useContext,useEffect} from 'react'
import Pet from "./Pet"
import Form from "react-bootstrap/Form";
import FormLabel from '@mui/material/FormLabel';
import PetsContext from '../context/pets/petsContext'

const ListOfPets = () => {
    const { allpets, searchPet } = useContext(PetsContext);
    const [buscando, setBuscando] = useState(false)
    const [search, setSearch] = useState({
        type: ''
    })

    useEffect(() => { 
      if(search.type !== ''){
        setBuscando(true) 
        const newSearch = {
            type: search.type,
          };
        searchPet(newSearch); 
      }else{
        setBuscando(false) 
      }
    }, [allpets,search])

    const OnChange = (e) => {
        setSearch({
          ...search,
          [e.target.name]: e.target.value,
        });
      };


    return ( 
        <div>
            <h2 style={{marginTop: "20px"}}>GIVE THEM A HOUSE</h2>
             <h3 >We are a non-profit association <br></br>
                 that seeks to build a better world for<br></br>
                  dogs through sustainable initiatives.</h3>
                <div>
                <div style={{width: "50%", textAlign: "center", margin: '0 auto'}}>
                <FormLabel style={{fontSize: "15px", fontWeight: "bold"}}>Search by Types</FormLabel>
                 <Form.Select
                      onChange={OnChange}
                      className="search-input"
                      name="type"
                      aria-label="Default select example"
                    >
                      <option value={''}>All Pet's Types</option>
                      <option value={'dog'}>Dog</option>
                      <option value={'cat'}>Cat</option>
                      <option value={'parrot'}>Parrot</option>
                      <option value={'hamster'}>Hamster</option>
                      <option value={'rabbit'}>Rabbit</option>
                      <option value={'turtle'}>Turtle</option>
                    </Form.Select>
              </div>
                </div>
            <Pet buscando={buscando}/>
        </div>
     );
}
 
export default ListOfPets;