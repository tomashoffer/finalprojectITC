import React, {useState, useContext, useEffect} from "react";
import AuthContext from '../../context/auth/authContext'
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";


const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
  const { icon } = props;

  const {
    icon: [width, height, svgPathData]
  } = icon;

  return (
    <MenuIcon style={{height: "30px", width: "30px"}}/>
  );
});

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [user, setUser] = useState([])
  const { usuario } = useContext(AuthContext)

    useEffect(() => {
      if(usuario){
        setUser(usuario)
      }
    })


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <p>Menu</p>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
        <a href='/'><p>Home</p></a>
        </ListItem>
        <ListItem button>
        <a href={`/user/${user._id}`}><p>My Profile</p></a>
        </ListItem>
        <ListItem button>
        <a href='/search'><p>Search</p></a>
        </ListItem>
        <ListItem button>
        <a href='/add'><p>Add Pet</p></a>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}  >
            <IconButton aria-label="Example" style={{color: 'white'}}>
              <FontAwesomeSvgIcon icon={faEllipsisV} />
            </IconButton>
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
