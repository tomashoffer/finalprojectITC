import React, { useContext, useState, useEffect } from "react";
import Spinner from "./Layout/Spinner/Spinner";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import ModalContext from "../context/modal/modalContext";
import AlertContext from "../context/alert/alertContext";
import AuthContext from "../context/auth/authContext";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
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

export default function TransitionsModal(props) {
  const { open, handleOpen, handleClose } = useContext(ModalContext);
  const { alerta, mostrarAlerta } = useContext(AlertContext);
  const { usuario, mensaje, authenticate, registrarUsuario, iniciarSesion, cerrarSesion, usuarioAutenticado } =
    useContext(AuthContext);

  useEffect(() => {
    if(localStorage.getItem('token')){
      usuarioAutenticado()
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, authenticate]);

  // user for now!!
  const [logIn, setLogIn] = useState({
    emailLogIn: "",
    passwordLogIn: "",
  });
  const [signUp, setSignUp] = useState({
    name: "",
    phone: "",
    emailSignUp: "",
    passwordSignUp: "",
    confirm: "",
  });
  const [value, setValue] = useState(0);
  const [spinner, setSpinner] = useState(false);

  const OnChangeLogIn = (e) => {
    setLogIn({
      ...logIn,
      [e.target.name]: e.target.value,
    });
  };
  const OnChangeSignUp = (e) => {
    setSignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmitLogIn = (e) => {
    e.preventDefault();
    if (logIn.emailLogIn.trim() === "" || logIn.passwordLogIn.trim() === "") {
      mostrarAlerta("You should fill all inputs", "alerta-error");
      return;
    }
    if (logIn.passwordLogIn.length < 6) {
      mostrarAlerta(
        "Password should have at least 6 characters",
        "alerta-error"
      );
      return;
    }
    const loginSubmit = {
      email: logIn.emailLogIn,
      password: logIn.passwordLogIn,
    };
    iniciarSesion(loginSubmit);
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 1000);

    setLogIn({
      emailLogIn: "",
      passwordLogIn: "",
    });
    handleClose();
  };
  const onSubmitSignUp = (e) => {
    e.preventDefault();
    if (signUp.name.trim() === "" ||
      signUp.phone.trim() === "" ||
      signUp.emailSignUp.trim() === "" ||
      signUp.passwordSignUp.trim() === "" ||
      signUp.confirm.trim() === ""
    ) {
      mostrarAlerta("You should fill all inputs", "alerta-error");
      return;
    }
    if (signUp.passwordSignUp !== signUp.confirm) {
      mostrarAlerta("Passwords are not equal", "alerta-error");
      return;
    }
    if (signUp.passwordSignUp.length < 6) {
      mostrarAlerta(
        "Password should have at least 6 characters",
        "alerta-error"
      );
      return;
    }
    const signUpSubmit = {
      name: signUp.name,
      phone: signUp.phone,
      email: signUp.emailSignUp,
      role: "user",
      password: signUp.passwordSignUp,
    };
    registrarUsuario(signUpSubmit);
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 1000);

    swal("Account created!", "Log In now!", "success");
    
    setSignUp({
      name: "",
      phone: "",
      emailSignUp: "",
      passwordSignUp: "",
      confirm: "",
    });

  };

  return (
    <div>
      {usuario ? (
        <div className="modal-log"><h2 class="header-fonts" onClick={cerrarSesion}>Log Out</h2></div>
      ) : (
        <div className="modal-log"><h2 class="header-fonts" style={{ color: "white" }} onClick={handleOpen}>
          Log In
        </h2></div>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {alerta ? (
              <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
            ) : null}
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
                  <Tab label="Log In" {...a11yProps(0)} />
                  <Tab label="Sign Up" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {spinner ? (
                  <div>
                    <Spinner />
                  </div>
                ) : (
                  <Box
                    component="form"
                    onSubmit={onSubmitLogIn}
                    sx={{
                      "& > :not(style)": { m: 1, width: "90%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {/* LOG IN FORM */}

                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      value={logIn.emailLogIn}
                      onChange={OnChangeLogIn}
                      name="emailLogIn"
                    />
                    <TextField
                      id="standard-basic"
                      label="Password"
                      variant="standard"
                      type="password"
                      value={logIn.passwordLogIn}
                      onChange={OnChangeLogIn}
                      name="passwordLogIn"
                    />
                    <Button type="submit" style={{background:'#F5B000'}} variant="contained">
                      Log In
                    </Button>
                  </Box>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {spinner ? (
                  <div>
                    <Spinner />
                  </div>
                ) : (
                  <Box
                    component="form"
                    onSubmit={onSubmitSignUp}
                    sx={{
                      "& > :not(style)": { m: 1, width: "90%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {/* SIGN UP FORM */}
                    <TextField
                      id="standard-basic"
                      label="Name & Last Name"
                      variant="standard"
                      value={signUp.name}
                      onChange={OnChangeSignUp}
                      name="name"
                    />
                    <TextField
                      id="standard-basic"
                      label="Phone"
                      variant="standard"
                      value={signUp.phone}
                      onChange={OnChangeSignUp}
                      name="phone"
                    />
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      value={signUp.emailSignUp}
                      onChange={OnChangeSignUp}
                      name="emailSignUp"
                    />
                    <TextField
                      id="standard-basic"
                      label="Password"
                      variant="standard"
                      type="password"
                      value={signUp.passwordSignUp}
                      onChange={OnChangeSignUp}
                      name="passwordSignUp"
                    />
                    <TextField
                      id="standard-basic"
                      label="Confirm Password"
                      variant="standard"
                      type="password"
                      value={signUp.confirm}
                      onChange={OnChangeSignUp}
                      name="confirm"
                    />
                    <Button type="submit" style={{background:'#F5B000'}} variant="contained">
                      Sign Up
                    </Button>
                  </Box>
                )}
              </TabPanel>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
