import React, { useState, useContext } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PetsContext from "../../context/pets/petsContext";
import AuthContext from "../../context/auth/authContext";
import Form from "react-bootstrap/Form";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalUpdatePet() {
  const [updatePet, setUpdatePet] = useState({
    name: "",
    type: "",
    adoptionStatus: null,
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
  const { updatePets, openUpdatePet, handleCloseUpdatePet, idSelected } = useContext(PetsContext)
  const { usuario } = useContext(AuthContext)

  const OnChange = (e) => {
    setUpdatePet({
      ...updatePet,
      [e.target.name]: e.target.value,
    });
  };

  const OnChangeImg = (e) => {
    setPicture(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      updatePet.name.trim() === "" ||
      updatePet.type.trim() === "" ||
      updatePet.height.trim() === "" ||
      updatePet.weight.trim() === "" ||
      updatePet.color.trim() === "" ||
      updatePet.bio.trim() === "" ||
      updatePet.hypoallergenic === null ||
      updatePet.dietaryRestrictions.trim() === "" ||
      updatePet.breed.trim() === ""
    ) {
      swal({
        text: "You must complete all the fields",
      });
      return;
    }
    if (picture === null) {
      swal({
        text: "You must upload an image",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", picture);
    formData.append("name", updatePet.name);
    formData.append("type", updatePet.type);
    formData.append("adoptionStatus", updatePet.adoptionStatus);
    formData.append("address", updatePet.address);
    formData.append("city", updatePet.city);
    formData.append("height", updatePet.height);
    formData.append("weight", updatePet.weight);
    formData.append("color", updatePet.color);
    formData.append("bio", updatePet.bio);
    formData.append("hypoallergenic", updatePet.hypoallergenic);
    formData.append("dietaryRestrictions", updatePet.dietaryRestrictions);
    formData.append("breed", updatePet.breed);
    formData.append("id", idSelected);
    formData.append("usuario", usuario._id);
    updatePets(formData)
    swal({
      icon: "success",
      text: "Pet update successfully",
    });

    handleCloseUpdatePet()

    setUpdatePet({
      name: "",
      type: "",
      adoptionStatus: null,
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

    setPicture(null);
  };
  return (
    <div>
      <Modal
        open={openUpdatePet}
        onClose={handleCloseUpdatePet}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                  value={updatePet.name}
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
                <InputLabel id="demo-simple-select-standard-label">
                  Status:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-standard"
                  onChange={OnChange}
                  className="search-input"
                  name="adoptionStatus"
                  label="Status"
                >
                  <MenuItem value={true}>Adopted ❤️</MenuItem>
                  <MenuItem value={false}>Need a house 🙏</MenuItem>
                </Select>

                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Address"
                  type="text"
                  name="address"
                  value={updatePet.address}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="City"
                  type="text"
                  name="city"
                  value={updatePet.city}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Height"
                  type="number"
                  name="height"
                  value={updatePet.height}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Weight"
                  type="number"
                  name="weight"
                  value={updatePet.weight}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Color"
                  type="text"
                  name="color"
                  value={updatePet.color}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Biography"
                  type="text"
                  name="bio"
                  value={updatePet.bio}
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
                  value={updatePet.breed}
                />
                <Input
                  onChange={OnChange}
                  className="search-input"
                  placeholder="Dietary Restrictions"
                  type="text"
                  name="dietaryRestrictions"
                  value={updatePet.dietaryRestrictions}
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
              style={{background:'#F5B000', marginBottom: "30px"}}
            >
              Update Pet
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}