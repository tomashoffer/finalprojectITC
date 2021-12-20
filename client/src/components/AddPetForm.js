import React, { useState, useContext } from "react";
import PetsContext from '../context/pets/petsContext'
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/AddPetForm.css'
import swal from "sweetalert";


const AddPetForm = () => {
  const [addpet, setAddpet] = useState({
    name: "",
    type: "",
    adoptionStatus: false,
    address: "",
    city: "",
    height: "",
    weight: "",
    color: "",
    bio: "",
    hypoallergenic: null,
    dietaryRestrictions: "",
    breed: "",
  });

  const [picture, setPicture] = useState()
  const [preview, setPreview] = useState()
  const { addNewPet } = useContext(PetsContext);


  const OnChange = (e) => {
    setAddpet({
      ...addpet,
      [e.target.name]: e.target.value,
    });
  };
  const OnChangeImg = (e) => {
    setPicture(e.target.files[0]);
    console.log(e.target.files[0])

      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2) {
          setPreview(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
  };

  
  const onSubmit = (e) => {
    e.preventDefault();
    if (addpet.name.trim() === "" || addpet.type.trim() === "" || addpet.height.trim() === "" || addpet.weight.trim() === ""|| addpet.color.trim() === ""|| addpet.bio.trim() === ""|| addpet.hypoallergenic === null|| addpet.dietaryRestrictions.trim() === ""|| addpet.breed.trim() === "" || picture === null) {
      swal({
        text: "You must complete all the fields",
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', picture)
    formData.append('name', addpet.name)
    formData.append('type', addpet.type)
    formData.append('address', addpet.address)
    formData.append('city', addpet.city)
    formData.append('height', addpet.height)
    formData.append('weight', addpet.weight)
    formData.append('color', addpet.color)
    formData.append('bio', addpet.bio)
    formData.append('hypoallergenic', addpet.hypoallergenic)
    formData.append('dietaryRestrictions', addpet.dietaryRestrictions)
    formData.append('breed', addpet.breed)
    // addNewPet(formData);


    swal({
      icon: "success",
      text: "Pet add successfully"
    });
    setAddpet({
      name: "",
      type: "",
      address: "",
      city: "",
      picture: null,
      height: "",
      weight: "",
      color: "",
      bio: "",
      hypoallergenic: null,
      dietaryRestrictions: "",
      breed: "",
    });

  };

  return (
    <div>
      <CssBaseline />
      <Container fixed>
        <h1>Add Pet for adoption</h1>
        <div className="container-grid">
        <div>
        {preview ? (<div><img style={{ height: "400px", width: "400px" }} src={preview} alt="" /></div>) : (<div><h3>Upload an image to see a preview</h3></div>)}
        </div>
        <form onSubmit={onSubmit} className="form-add" enctype="multipart/form-data">
          <div className='form-grid'>
          <div>
        <Form.Control onChange={OnChange} className="form-input" value={addpet.name} name="name" size="lg" type="text" placeholder="Name" />
        <Form.Control onChange={OnChange} className="form-input" value={addpet.type} name="type" size="lg" type="text" placeholder="Type" />
        <Form.Control onChange={OnChange} className="form-input" value={addpet.address} name="address" size="lg" type="text" placeholder="Address" />
        <Form.Control onChange={OnChange} className="form-input" value={addpet.city} name="city" size="lg" type="text" placeholder="City" />
        <Form.Control onChange={OnChange} className="form-input" value={addpet.height} name="height" size="lg" type="text" placeholder="Height" />
        <Form.Control onChange={OnChange} className="form-input" value={addpet.weight} name="weight"  size="lg" type="text" placeholder="Weight" />
        </div>
        <div>
        <Form.Control onChange={OnChange} className="form-input" value={addpet.color} name="color"  size="lg" type="text" placeholder="Color" />
        <Form.Control onChange={OnChange} className="form-input" value={addpet.bio} name="bio" size="lg" type="text" placeholder="Biography" />
        <Form.Select onChange={OnChange} className="form-input" name="hypoallergenic" aria-label="Default select example">
        <option>Hypoallergenic:</option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
        </Form.Select>
        <Form.Control onChange={OnChange} className="form-input" name="dietaryRestrictions" value={addpet.dietaryRestrictions} size="lg" type="text" placeholder="Dietary Restrictions" />
        <Form.Control onChange={OnChange} className="form-input" value={addpet.breed} name="breed" size="lg" type="text" placeholder="Breed" />
        <div className="form-file">
         <Form.Label className="form-file-label">Image:</Form.Label>
        <Form.Control onChange={OnChangeImg} name="picture" className="form-file-input" type="file" />
       </div>
    </div>
    </div>
        <Button className="btn-submit" type='submit' variant="contained" color="success">
        Add Pet
      </Button>
        </form> 
        </div>
       
       
      </Container>
    </div>
  );
};

export default AddPetForm;
