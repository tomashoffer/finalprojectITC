import React, { useState, useContext } from "react";
import PetsContext from "../context/pets/petsContext";
import AuthContext from "../context/auth/authContext";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Form from "react-bootstrap/Form";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/AddPetForm.css";
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

  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState();
  const { addNewPet } = useContext(PetsContext);
  const { usuario } = useContext(AuthContext);

  const OnChange = (e) => {
    setAddpet({
      ...addpet,
      [e.target.name]: e.target.value,
    });
  };
  const OnChangeImg = (e) => {
    setPicture(e.target.files[0]);
    console.log(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      addpet.name.trim() === "" ||
      addpet.type.trim() === "" ||
      addpet.height.trim() === "" ||
      addpet.weight.trim() === "" ||
      addpet.color.trim() === "" ||
      addpet.bio.trim() === "" ||
      addpet.hypoallergenic === null ||
      addpet.dietaryRestrictions.trim() === "" ||
      addpet.breed.trim() === ""
    ) {
      swal({
        text: "You must complete all the fields",
      });
      return;
    }
    if (picture === null) {
      swal({
        text: "You must complete all the fields",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("name", addpet.name);
    formData.append("type", addpet.type);
    formData.append("address", addpet.address);
    formData.append("city", addpet.city);
    formData.append("height", addpet.height);
    formData.append("weight", addpet.weight);
    formData.append("color", addpet.color);
    formData.append("bio", addpet.bio);
    formData.append("hypoallergenic", addpet.hypoallergenic);
    formData.append("dietaryRestrictions", addpet.dietaryRestrictions);
    formData.append("breed", addpet.breed);
    formData.append("userId", usuario._id);
    addNewPet(formData);

    swal({
      icon: "success",
      text: "Pet add successfully",
    });
    setPicture(null);
  };

  return (
    <div>
      <CssBaseline />
      <Container fixed>
        <h1 className="add_title">Add Pet for adoption</h1>
        <div className="container-grid">
          <div>
            {preview ? (
              <div className="container_img">
                <img
                  src={preview}
                  style={{height: "250px",
                  width: "250px", marginTop: "80px"}}
                  alt="prev img pet"
                />
              </div>
            ) : (
              <div>
                <h3>Upload an image to see a preview</h3>
              </div>
            )}
          </div>
          <form
            onSubmit={onSubmit}
            className="form-add"
            enctype="multipart/form-data"
          >
            <div className="form-grid">
              <div>
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={addpet.name}
                />
                <InputLabel id="demo-simple-select-standard-label">
                  Type:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-standard"
                  onChange={OnChange}
                  className="search-input"
                  name="type"
                  label="Type"
                >
                  <MenuItem value={""}>Types:</MenuItem>
                  <MenuItem value={"dog"}>Dog</MenuItem>
                  <MenuItem value={"cat"}>Cat</MenuItem>
                  <MenuItem value={"parrot"}>Parrot</MenuItem>
                  <MenuItem value={"hamster"}>Hamster</MenuItem>
                  <MenuItem value={"rabbit"}>Rabbit</MenuItem>
                  <MenuItem value={"turtle"}>Turtle</MenuItem>
                </Select>

                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Address"
                  type="text"
                  name="address"
                  value={addpet.address}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="City"
                  type="text"
                  name="city"
                  value={addpet.city}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Height"
                  type="number"
                  name="height"
                  value={addpet.height}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Weight"
                  type="number"
                  name="weight"
                  value={addpet.weight}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Color"
                  type="text"
                  name="color"
                  value={addpet.color}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Biography"
                  type="text"
                  name="bio"
                  value={addpet.bio}
                />
                <InputLabel id="demo-simple-select-standard-label">
                  Hypoallergenic:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-standard"
                  onChange={OnChange}
                  className="search-input"
                  name="hypoallergenic"
                  label="hypoallergenic"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Breed"
                  type="text"
                  name="breed"
                  value={addpet.breed}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Dietary Restrictions"
                  type="text"
                  name="dietaryRestrictions"
                  value={addpet.dietaryRestrictions}
                />
                <div className="form-file">
                  <Form.Label className="form-file-label">Image:</Form.Label>
                  <Form.Control
                    onChange={OnChangeImg}
                    name="picture"
                    style={{marginBottom: "10px"}}
                    type="file"
                  />
                </div>
              </div>
            </div>
            <Button
              className="btn-submit"
              type="submit"
              variant="contained"
              color="success"
              style={{marginBottom: "30px"}}
            >
              Add Pet
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddPetForm;
