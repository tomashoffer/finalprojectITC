import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Spinner from "./Layout/Spinner/Spinner";
import PetsContext from "../context/pets/petsContext";
import AuthContext from "../context/auth/authContext";
import "./style/Pet.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const { usuario } = useContext(AuthContext);
  const {
    getAllPets,
    allpets,
    savePet,
    adoptPet,
    unsavePet,
    fosterPet,
    unfosterPet,
    adopt,
    saved,
    foster,
    getAdoptedPets,
    getFosterPets,
    getSavedPets,
    getOnePet,
    returnAdoptPet,
  } = useContext(PetsContext);
  const [spinner, setSpinner] = useState(false);
  const [value, setValue] = useState(0);
  // const navegate = useNavigate()

  useEffect(() => {
    getAllPets();
    if (allpets) {
      getAdoptedPets();
      getFosterPets();
      getSavedPets();
    } else {
      setSpinner(true);
      setTimeout(() => {
        setSpinner(false);
      }, 1000);
    }
  }, [allpets]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onClickSave = (id) => {
    savePet({ usuario: usuario._id, petId: id });
  };
  const onClickAdopt = (id) => {
    adoptPet({ usuario: usuario._id, petId: id });
  };
  const onClickUnSave = (id) => {
    unsavePet({ usuario: usuario._id, petId: id });
  };
  const onClickFoster = (id) => {
    fosterPet({ usuario: usuario._id, petId: id });
  };
  const onClickUnfoster = (id) => {
    unfosterPet({ usuario: usuario._id, petId: id });
  };
  const returnApodted = (id) => {
    returnAdoptPet({ usuario: usuario._id, petId: id });
  };
  const selectPet = (datos) => {
    getOnePet(datos);
    // navegate(`pet/${datos._id}`, true)
    return <Navigate to={`pet/${datos._id}`} />;
  };

  return (
    <div>
      {spinner ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <CssBaseline />
          <Container fixed>
            <h1>See your Pets! </h1>
            <div className="profile-tabs">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ bgcolor: "background.paper" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    TabIndicatorProps={{ style: { background: "#F5B000" } }}
                    centered
                  >
                    <Tab label="My Adopted Pets" {...a11yProps(0)} />
                    <Tab label="My Saved Pets" {...a11yProps(0)} />
                    <Tab label="My Foster Pets" {...a11yProps(0)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {adopt.length ? (
                    <div className="card-pets">
                      {adopt.map((item) => (
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
                              onClick={() => selectPet(item)}
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
                              <p>Bio: {item.bio}</p>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              style={{ textAlign: "center" }}
                            >
                              <p>Breed: {item.breed}</p>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              style={{ textAlign: "center" }}
                            >
                              {item.adoptionStatus ? (
                                <h3 variant="outlined">Adopted ❤️</h3>
                              ) : (
                                <h3 variant="outlined">Need a house 🙏</h3>
                              )}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {usuario ? (
                              <div className="card-action">
                                {!item.adoptionStatus ? (
                                  <Button
                                    variant="outlined"
                                    color="warning"
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
                                        variant="outlined"
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
                                    item.foster
                                      .toString()
                                      .includes(usuario._id) ? (
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                          onClickUnfoster(item._id)
                                        }
                                      >
                                        RETURN FOSTER PET
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="outlined"
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
                                    variant="outlined"
                                    color="error"
                                    onClick={() => onClickUnSave(item._id)}
                                  >
                                    UNSAVE
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outlined"
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
                  ) : (
                    <div>
                      <h3>No adopted pets</h3>
                    </div>
                  )}
                </TabPanel>

                <TabPanel value={value} index={1}>
                  {saved.length ? (
                    <div className="card-pets">
                      {saved.map((item) => (
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
                              onClick={() => selectPet(item)}
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
                              <p>Bio: {item.bio}</p>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              style={{ textAlign: "center" }}
                            >
                              <p>Breed: {item.breed}</p>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {usuario ? (
                              <div className="card-action">
                                {!item.adoptionStatus ? (
                                  <Button
                                    variant="outlined"
                                    color="warning"
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
                                        variant="outlined"
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
                                    item.foster
                                      .toString()
                                      .includes(usuario._id) ? (
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                          onClickUnfoster(item._id)
                                        }
                                      >
                                        RETURN FOSTER PET
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="outlined"
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
                                    variant="outlined"
                                    color="error"
                                    onClick={() => onClickUnSave(item._id)}
                                  >
                                    UNSAVE
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outlined"
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
                  ) : (
                    <div>
                      <h3>No saved pets</h3>
                    </div>
                  )}
                </TabPanel>

                <TabPanel value={value} index={2}>
                  {foster.length ? (
                    <div className="card-pets">
                      {foster.map((item) => (
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
                              onClick={() => selectPet(item)}
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
                              <p>Bio: {item.bio}</p>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              style={{ textAlign: "center" }}
                            >
                              <p>Breed: {item.breed}</p>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {usuario ? (
                              <div className="card-action">
                                {!item.adoptionStatus ? (
                                  <Button
                                    variant="outlined"
                                    color="warning"
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
                                        variant="outlined"
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
                                    item.foster
                                      .toString()
                                      .includes(usuario._id) ? (
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                          onClickUnfoster(item._id)
                                        }
                                      >
                                        RETURN FOSTER PET
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="outlined"
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
                                    variant="outlined"
                                    color="error"
                                    onClick={() => onClickUnSave(item._id)}
                                  >
                                    UNSAVE
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outlined"
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
                  ) : (
                    <div>
                      <h3>No fostered pets</h3>
                    </div>
                  )}
                </TabPanel>
              </Box>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Profile;
