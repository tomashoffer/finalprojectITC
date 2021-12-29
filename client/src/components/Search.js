import React, { useState, useContext, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PetsContext from "../context/pets/petsContext";
import AuthContext from "../context/auth/authContext";
import Spinner from "./Layout/Spinner/Spinner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import "./style/Pet.css";
import "./style/Search.css";

const Search = () => {
  const [checked, setChecked] = React.useState(false);
  const [mascotas, setMascotas] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState({
    name: "",
    type: "",
    adoptionStatus: null,
    height: "",
    weight: "",
  });
  const {
    searchPet,
    searchState,
    savePet,
    adoptPet,
    unsavePet,
    fosterPet,
    unfosterPet,
    returnAdoptPet,
    getAllPets, 
    allpets
  } = useContext(PetsContext);
  const { usuario } = useContext(AuthContext);


  useEffect(() => {
    setSpinner(true)
    getAllPets();
    if(search){
      searchPet(search);
    }
    if (searchState) {
      setMascotas(searchState);
    }
    setSpinner(false)
    // eslint-disable-next-line
  }, [allpets]);

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
    };
    searchPet(newSearch);
    setSubmit(true);
    console.log(newSearch);
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  };
  const handleChange = (event) => {
    setSearch({
      name: "",
      type: "",
      adoptionStatus: null,
      height: "",
      weight: "",
    })
    setChecked(event.target.checked);
  };

  const onClickSave = (id) => {
    savePet({ usuario: usuario._id, petId: id });
    getAllPets()
  };
  const onClickAdopt = (id) => {
    adoptPet({ usuario: usuario._id, petId: id });
    getAllPets()
  };
  const onClickUnSave = (id) => {
    unsavePet({ usuario: usuario._id, petId: id });
    getAllPets()
  };
  const onClickFoster = (id) => {
    fosterPet({ usuario: usuario._id, petId: id });
    getAllPets()
  };
  const onClickUnfoster = (id) => {
    unfosterPet({ usuario: usuario._id, petId: id });
    getAllPets()
  };
  const returnApodted = (id) => {
    returnAdoptPet({ usuario: usuario._id, petId: id });
    getAllPets()
  };


  return (
    <div>
      <h1 className="title_search">Search Pets</h1>
      <div>
        <form onSubmit={onSubmit}>
          <CssBaseline />
          <Container fixed>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  color="warning"
                />
              }
              label="Advance Search"
            />
            {checked ? (
              <div>
                <div className="form-grid">
                  <InputLabel id="demo-simple-select-standard-label">
                    Adoption Status:
                  </InputLabel>
                  <Select
                    labelId="test-select-label"
                    id="demo-simple-select-standard"
                    onChange={OnChange}
                    className="search-input"
                    name="adoptionStatus"
                    label="Adoption Status"
                  >
                    <MenuItem value={null}>Adoption Status:</MenuItem>
                    <MenuItem value={true}>Adopted ❤️</MenuItem>
                    <MenuItem value={false}>Looking for a House 😢</MenuItem>
                  </Select>

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
                    placeholder="Name"
                    type="text"
                    value={search.name}
                  />

                  <Input
                    onChange={OnChange}
                    className="search-input"
                    placeholder="Weight"
                    type="number"
                    value={search.weight}
                  />

                  <Input
                    onChange={OnChange}
                    className="search-input"
                    placeholder="Height"
                    type="number"
                    value={search.height}
                  />
                  <Button
                    className="btn-submit"
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Search Pet
                  </Button>
                </div>
              </div>
            ) : (
              <div className="form-grid">
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
                <Button
                  className="btn-submit"
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  Search Pet
                </Button>
              </div>
            )}
          </Container>
        </form>
      </div>

      {spinner ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          {searchState ? (
            <div>
              <CssBaseline />
              <Container fixed>
                <div className="card-pets">
                  {mascotas.map((item) => (
                    <Card
                      sx={{ maxWidth: 345 }}
                      style={{
                        marginBottom: "30px",
                        backgroundColor: "#FDCE4E",
                        borderRadius: "10%",
                      }}
                      key={item._id}
                    >
                      <a href={`http://localhost:3000/pet/${item._id}`}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.picture}
                          alt="mascota"
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                      <CardContent className="card_content">
                        <Typography gutterBottom variant="h5" component="div">
                          <h3>Name: {item.name}</h3>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          style={{ textAlign: "center" }}
                        >
                          <p>Type: {item.type}</p>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          style={{ textAlign: "center" }}
                        >
                          <p>Status: </p>
                          {item.adoptionStatus ? (
                            <p>Adopted ❤️</p>
                          ) : (
                            <>
                              {item.foster ? (
                                <p>Pet Fostered</p>
                              ) : (
                                <p>Need a house 🙏</p>
                              )}
                            </>
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          style={{ textAlign: "center" }}
                        >
                          <a href={`/pet/${item._id}`} className="details_pets"><p>See Detalils</p></a>
                        </Typography>
                      </CardContent>
                      <CardActions className="card-btn">
                        {usuario ? (
                          <div className="card-action">
                            {!item.adoptionStatus ? (
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => onClickAdopt(item._id)}
                              >
                                ADOPT ME
                              </Button>
                            ) : (
                              <>
                                {item.adopted
                                  .toString()
                                  .includes(usuario._id) ? (
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => returnApodted(item._id)}
                                  >
                                    RETURN ADOPTED PET
                                  </Button>
                                ) : null}
                              </>
                            )}

                            {item.adoptionStatus ? null : (
                              <>
                                {item.foster &&
                                item.foster.toString().includes(usuario._id) ? (
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => onClickUnfoster(item._id)}
                                  >
                                    RETURN FOSTER PET
                                  </Button>
                                ) : (
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => onClickFoster(item._id)}
                                  >
                                    FOSTER
                                  </Button>
                                )}
                              </>
                            )}

                            {item.saved &&
                            item.saved.toString().includes(usuario._id) ? (
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => onClickUnSave(item._id)}
                              >
                                UNSAVE
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => onClickSave(item._id)}
                              >
                                SAVE {item.name}
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div>
                            <h3>Give {item.name} a 🏠, Log in!</h3>
                          </div>
                        )}
                      </CardActions>
                    </Card>
                  ))}
                </div>
              </Container>
            </div>
          ) : (
            <div>
              {submit ? (
                <div>
                  <h2>No pets found</h2>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
