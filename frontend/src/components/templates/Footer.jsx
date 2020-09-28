import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
});

const Footer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="読書中" icon={<ImportContactsIcon />} />
      <BottomNavigationAction
        label="読了"
        icon={<i style={{ fontSize: 20 }} class="fas fa-book"></i>}
      />
    </BottomNavigation>
  );
};
export default Footer;
