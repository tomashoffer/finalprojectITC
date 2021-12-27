import React, {useState, useContext} from 'react';
import PetsContext from "../../context/pets/petsContext";
import AuthContext from "../../context/auth/authContext";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from '@mui/material/Modal';
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

export default function ModalUpdateUser() {

  const [updateUser, setUpdateUser] = useState({
    name: "",
    phone: "",
    email: "",
    role: ''
  });

  const { openUpdateUser, handleCloseUpdateUser, updateUsers, usuario } = useContext(AuthContext)
  const { idSelected } = useContext(PetsContext)

  const OnChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (updateUser.name.trim() === "" ||
      updateUser.phone.trim() === "" ||
      updateUser.email.trim() === "" ||
      updateUser.role.trim() === "" 
    ) {
      swal("You should fill all inputs", "alerta-error");
      return;
    }
    const newUpdate = {
      name: updateUser.name,
      phone: updateUser.phone,
      email: updateUser.email,
      role: updateUser.role,
      id: idSelected,
      user: usuario._id
    };
    updateUsers(newUpdate);
    handleCloseUpdateUser()
    swal("Done!", "User Updated!", "success");
    
    setUpdateUser({
      name: "",
      phone: "",
      email: "",
      role: ''
    });

  };

  return (
    <div>
      <Modal
        open={openUpdateUser}
        onClose={handleCloseUpdateUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
              <Box
                    component="form"
                    onSubmit={onSubmit}
                    sx={{
                      "& > :not(style)": { m: 1, width: "90%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {/* SIGN UP FORM */}
                    <Input
                      placeholder="Name & Last Name"
                      value={updateUser.name}
                      onChange={OnChange}
                      type="text"
                      name="name"
                    />
                    <Input
                      id="standard-basic"
                      placeholder="Phone"
                      value={updateUser.phone}
                      onChange={OnChange}
                      type="text"
                      name="phone"
                    />
                    <Input
                      id="standard-basic"
                      placeholder="Email"
                      value={updateUser.email}
                      onChange={OnChange}
                      type="text"
                      name="email"
                    />
                    <InputLabel id="demo-simple-select-standard-label">
                  Role:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-standard"
                  onChange={OnChange}
                  className="search-input"
                  name="role"
                  label="Role"
                >
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
                    <Button type="submit" style={{background:'#F5B000'}} variant="contained">
                      Update User
                    </Button>

            </Box>
        </Box>
      </Modal>
    </div>
  );
}