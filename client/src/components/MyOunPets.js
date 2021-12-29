import React, { useState, useContext, useEffect } from "react";
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

const MyOunPets = () => {
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
    returnAdoptPet,
  } = useContext(PetsContext);
  const [spinner, setSpinner] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setSpinner(true);
    getAllPets();
    if (allpets && usuario) {
      getAdoptedPets(usuario._id);
      getFosterPets(usuario._id);
      getSavedPets(usuario._id);
    } 
    setSpinner(false);
    // eslint-disable-next-line
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

  return (
    <div>
      {usuario && usuario.role === 'user' && !spinner ? 
       (
        <div>
          <CssBaseline />
          (
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
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                          <CardContent className="card_content">
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
                              <p>Status: </p>
                              {item.adoptionStatus ? (
                                <p variant="outlined">Adopted ❤️</p>
                              ) : (
                                <>
                                  {item.foster ? (
                                    <p variant="outlined">Pet Fostered</p>
                                  ) : (
                                    <p variant="outlined">Need a house 🙏</p>
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
                                    ) : null
                                    }
                                  </>
                                )}

                                {item.adoptionStatus ? null : (
                                  <>
                                    {item.foster &&
                                    item.foster
                                      .toString()
                                      .includes(usuario._id) ? (
                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                          onClickUnfoster(item._id)
                                        }
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
                  ) : (<>{spinner ?
                    (
                     <div>
                       <Spinner />
                     </div>
                   ) :
                    (<div>
                      <h3>You currently do not own any pets.</h3>
                    </div>)}</>)}
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
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                          <CardContent className="card_content">
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
                                    item.foster
                                      .toString()
                                      .includes(usuario._id) ? (
                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                          onClickUnfoster(item._id)
                                        }
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
                  ) : (<>{ spinner ?
                      (
                       <div>
                         <Spinner />
                       </div>
                     ) :
                    (<div>
                      <h3>You currently do not saved any pets.</h3>
                    </div>)}
                    </>)
                  }
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
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                          <CardContent className="card_content">
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
                                    item.foster
                                      .toString()
                                      .includes(usuario._id) ? (
                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                          onClickUnfoster(item._id)
                                        }
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
                  ) : (<>
                    {spinner ?
                     (
                      <div>
                        <Spinner />
                      </div>
                    ) : (<div>
                      <h3>You currently do not foster any pets.</h3>
                    </div>)}
                    </>)}
                </TabPanel>
              </Box>
            </div>
          </Container>
        </div>
      ) : null}
    </div>
  );
};

export default MyOunPets;
