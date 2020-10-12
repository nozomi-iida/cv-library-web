import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../store/authStore";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  image_round: {
    borderRadius: "50%",
    width: 50,
    height: 50,
  },
}));

export default function ButtonAppBar() {
  const user = useContext(AuthContext);
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

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

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {});
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          {user && (
            <>
              <Avatar src={user.photoURL} style={{ marginRight: 10 }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <ListItemText primary={`${user.displayName}`} />
                <ListItemText primary={`${user.email}`} />
              </div>
            </>
          )}
        </ListItem>
        <ListItem style={{ height: 40, backgroundColor: "#3f51b5" }}>
          {user ? (
            <IconButton
              style={{ color: "#fff", width: "100%" }}
              onClick={logout}
            >
              ログアウト
            </IconButton>
          ) : (
            <Link to="/signIn" style={{ textDecoration: "none" }}>
              <IconButton style={{ color: "#fff", width: "100%" }}>
                ログイン
              </IconButton>
            </Link>
          )}
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(anchor, true)}
              >
                <MenuIcon />
              </IconButton>
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
          <Typography variant="h6" className={classes.title}>
            CV Library
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
