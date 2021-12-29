import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Spinner from "./Layout/Spinner/Spinner";
import "./style/Pet.css";
import PetsContext from "../context/pets/petsContext";
import AuthContext from "../context/auth/authContext";

const Pet = ({ buscando }) => {
  const { usuario } = useContext(AuthContext);

  const {
    getAllPets,
    allpets,
    savePet,
    adoptPet,
    unsavePet,
    fosterPet,
    unfosterPet,
    searchState,
    getOnePet,
    returnAdoptPet,
  } = useContext(PetsContext);
  const [mascotas, setMascotas] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    setSpinner(true);
    getAllPets();
    if (allpets) {
      setMascotas(allpets);
    }
    setSpinner(false);
    // eslint-disable-next-line
  }, [allpets]);

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
    getOnePet(datos._id);
    history(`pet/${datos._id}`);
  };

  return (
    <>
      {spinner ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <CssBaseline />
          <Container fixed>
            <div className="card-pets">
              {searchState && buscando ? (
                <>
                  {searchState.map((item) => (
                    <Card
                      sx={{ maxWidth: 345 }}
                      style={{
                        marginBottom: "30px",
                        backgroundColor: "#FDCE4E",
                        borderRadius: "10%",
                      }}
                      key={item._id}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.picture}
                        alt="mascota"
                        style={{ cursor: "pointer" }}
                      />
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
                            <p variant="contained">Adopted ❤️</p>
                          ) : (
                            <>
                              {item.foster ? (
                                <p variant="contained">Pet Fostered</p>
                              ) : (
                                <h3 variant="contained">Need a house 🙏</h3>
                              )}
                            </>
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          style={{ textAlign: "center" }}
                        >
                          <p onClick={() => selectPet(item)} className="details_pets">See Detalils</p>
                        </Typography>
                      </CardContent>
                      <CardActions className="card-btn">
                        {usuario ? (
                          <div className="card-action">
                            {!item.adoptionStatus ? (
                              <Button
                                variant="contained"
                                color="success"
                                className="btn_action"
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
                                    className="btn_action"
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
                                    className="btn_action"
                                  >
                                    RETURN FOSTER PET
                                  </Button>
                                ) : (
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => onClickFoster(item._id)}
                                    className="btn_action"
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
                                className="btn_action"
                              >
                                UNSAVE
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => onClickSave(item._id)}
                                className="btn_action"
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
                </>
              ) : (
                <>
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
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.picture}
                        alt="mascota"
                        style={{ cursor: "pointer" }}
                      />
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
                            <p variant="contained">Adopted ❤️</p>
                          ) : (
                            <>
                              {item.foster ? (
                                <p variant="contained">Pet Fostered</p>
                              ) : (
                                <p variant="contained">Need a house 🙏</p>
                              )}
                            </>
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          style={{ textAlign: "center" }}
                        >
                          <p onClick={() => selectPet(item)} className="details_pets">See Detalils</p>
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
                                className="btn_action"
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
                                    className="btn_action"
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
                                    className="btn_action"
                                  >
                                    RETURN FOSTER PET
                                  </Button>
                                ) : (
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => onClickFoster(item._id)}
                                    className="btn_action"
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
                                className="btn_action"
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
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Pet;
