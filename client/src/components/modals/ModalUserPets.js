import React, {useState, useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PetsContext from "../../context/pets/petsContext";
import AuthContext from "../../context/auth/authContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "react-bootstrap/Table";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


export default function ModalUserPets() {

  const { openSeePets, handleCloseSeePets, getAdoptedPets, getFosterPets, getSavedPets, 
  saved, adopt, foster, allpets, getAllPets} = useContext(PetsContext)
  const { usuario, idUserSelected } = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    getAllPets();
    if (allpets && usuario && idUserSelected) {
      getAdoptedPets(idUserSelected);
      getFosterPets(idUserSelected);
      getSavedPets(idUserSelected);
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

  return (
    <div>
      <Modal
        open={openSeePets}
        onClose={handleCloseSeePets}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                  TabIndicatorProps={{style: {background:'#F5B000'}}}
                >
                  <Tab label="Adopted" {...a11yProps(0)} />
                  <Tab label="Fostered" {...a11yProps(1)} />
                  <Tab label="Saved" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
              {adopt.length ? (<Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Breed</th>
                      </tr>
                    </thead>
                    <tbody>
                   {adopt.map((pet) => (
                          <tr>
                          <td><p>{pet.name}</p></td>
                          <td><p>{pet.type}</p></td>
                          <td>{pet.adoptionStatus ? (<p>Adopted ❤️</p>) : (<p>Need a house 🙏</p>)}</td>
                          <td><p>{pet.breed}</p></td>
                        </tr>
                      ))}           
                    </tbody>
                  </Table>) : (<h4>This user has not foster pets</h4>)}
              </TabPanel>
              <TabPanel value={value} index={1}>
              {saved.length ? (<Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Breed</th>
                      </tr>
                    </thead>
                    <tbody>
                   {saved.map((pet) => (
                          <tr>
                          <td><p>{pet.name}</p></td>
                          <td><p>{pet.type}</p></td>
                          <td>{pet.adoptionStatus ? (<p>Adopted ❤️</p>) : (<p>Need a house 🙏</p>)}</td>
                          <td><p>{pet.breed}</p></td>
                        </tr>
                      ))}           
                    </tbody>
                  </Table>) : (<h4>This user has not saved pets</h4>)}
              </TabPanel>
              <TabPanel value={value} index={2}>
              {foster.length ? (<Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Breed</th>
                      </tr>
                    </thead>
                    <tbody>
                   {foster.map((pet) => (
                          <tr>
                          <td><p>{pet.name}</p></td>
                          <td><p>{pet.type}</p></td>
                          <td>{pet.adoptionStatus ? (<p>Adopted ❤️</p>) : (<p>Need a house 🙏</p>)}</td>
                          <td><p>{pet.breed}</p></td>
                        </tr>
                      ))}           
                    </tbody>
                  </Table>) : (<h4>This user has not foster pets</h4>)}
              </TabPanel>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}