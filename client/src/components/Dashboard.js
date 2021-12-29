import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Table from "react-bootstrap/Table";
import Spinner from "./Layout/Spinner/Spinner";
import PetsContext from "../context/pets/petsContext";
import AuthContext from "../context/auth/authContext";
import ModalUpdatePet from "../components/modals/ModalUpdatePet";
import ModalUpdateUser from "../components/modals/ModalUpdateUser";
import ModalUserPets from "../components/modals/ModalUserPets";
import swal from "sweetalert";
import "./style/Dashboard.css";

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

const Dashboard = () => {
  const {
    usuario,
    getAllUsers,
    allusers,
    handleOpenUpdateUser,
    setIdUserSelected,
    deleteUser,
  } = useContext(AuthContext);
  const {
    getAllPets,
    allpets,
    handleOpenUpdatePet,
    handleOpenSeePets,
    setIdSelected,
    deletePet,
  } = useContext(PetsContext);
  const [spinner, setSpinner] = useState(false);
  const [users, setUsers] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setSpinner(true);
    if (!allpets) {
      getAllPets();
      setMascotas(allpets);
    }
    if (!allusers) {
      getAllUsers();
      setUsers(allusers);
    }
    if (allusers !== users) {
      getAllUsers();
      setUsers(allusers);
    }
    if (allpets !== mascotas) {
      getAllPets();
      setMascotas(allpets);
    }
    setSpinner(false);
    // eslint-disable-next-line
  }, [allpets, allusers]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateThisPet = (id) => {
    setIdSelected(id);
    handleOpenUpdatePet();
  };
  const seeAllPets = (id) => {
    setIdUserSelected(id);
    handleOpenSeePets();
  };

  const deleteThisPet = (id) => {
    const data = { petId: id, user: usuario._id };
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Pet!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your Pet has been deleted!", {
          icon: "success",
        });
        deletePet(data);
      } else {
        swal("Your Pet is safe!");
      }
    });
  };

  const updateThisUser = (id) => {
    setIdSelected(id);
    handleOpenUpdateUser();
  };

  const deleteThisUser = (id) => {
    const data = { id: id, user: usuario._id };
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your User has been deleted!", {
          icon: "success",
        });
        deleteUser(data);
      } else {
        swal("Your User is safe!");
      }
    });
  };

  return (
    <div>
      {usuario && usuario.role === "admin" ? (
        <>
          {spinner ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <div>
              <CssBaseline />
              <Container fixed>
                <h1 className='dashboard_title'>Dashboard</h1>
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
                        <Tab label="All Users" {...a11yProps(0)} />
                        <Tab label="All Pets" {...a11yProps(0)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      {allusers ? (
                        <Table responsive striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allusers.map((user) => (
                              <tr>
                                <td>
                                  <p>{user.name}</p>
                                </td>
                                <td>
                                  <p>{user.phone}</p>
                                </td>
                                <td>
                                  <p>{user.email}</p>
                                </td>
                                <td>
                                  <p>{user.role}</p>
                                </td>
                                <td className="action_btn">
                                  <div>
                                    <Button
                                      onClick={() => seeAllPets(user._id)}
                                    >
                                      See Pets
                                    </Button>
                                    <Button
                                      onClick={() => updateThisUser(user._id)}
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      onClick={() => deleteThisUser(user._id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            <ModalUpdateUser />
                            <ModalUserPets />
                          </tbody>
                        </Table>
                      ) : (
                        <h3>No users created</h3>
                      )}
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                      {allpets ? (
                        <Table responsive striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>Picture</th>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allpets.map((pet) => (
                              <tr>
                                <td>
                                  <img
                                    className="table_img"
                                    src={pet.picture}
                                    alt=""
                                  />
                                </td>
                                <td>
                                  <p>{pet.name}</p>
                                </td>
                                <td>
                                  <p>{pet.type}</p>
                                </td>
                                <td>
                                  {pet.adoptionStatus ? (
                                    <p>Adopted ❤️</p>
                                  ) : (
                                    <p>Need a house 🙏</p>
                                  )}
                                </td>
                                <td className="action_btn">
                                  <div>
                                    <Button
                                      onClick={() => updateThisPet(pet._id)}
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      onClick={() => deleteThisPet(pet._id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            <ModalUpdatePet />
                          </tbody>
                        </Table>
                      ) : (
                        <h3>No pets created</h3>
                      )}
                    </TabPanel>
                  </Box>
                </div>
              </Container>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
