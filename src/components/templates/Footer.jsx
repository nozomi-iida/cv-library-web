import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { useDispatch, useSelector } from "react-redux";
import { BookStatusChange } from "../../reducks/status/actions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
});

const Footer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const value = (state) => {
    return state.status;
  };
  const status = useSelector(value);
  const onClick = () => {
    history.push('/')
  }
  return (
    <BottomNavigation
      value={status}
      onChange={(event, newValue) => {
        dispatch(BookStatusChange(newValue));
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="読書中" onClick={onClick} icon={<ImportContactsIcon />} />
      <BottomNavigationAction
        label="読了"
        icon={<i style={{ fontSize: 20 }} className="fas fa-book"></i>}
        onClick={onClick}
      />
    </BottomNavigation>
  );
};
export default Footer;
