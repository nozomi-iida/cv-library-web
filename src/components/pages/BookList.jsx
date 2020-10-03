import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: 10,
  },

  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList({history}) {
  const classes = useStyles();
  const goform = () => {
    history.push("/add");
  };

  return (
    <>
    <div className={classes.root}>
      <List component="nav">
        <ListItemLink href="/book">
          <ListItemText
            className={classes.list}
            primary="「MIU404」公式メモリアルブック Amazon限定表紙版"
            classes={{ primary: classes.primary }}
          />
        </ListItemLink>
        <Divider />
        <ListItemLink href="/book">
          <ListItemText
            className={classes.list}
            primary="「気がつきすぎて疲れる」が驚くほどなくなる 「繊細さん」の本"
            classes={{ primary: classes.primary }}
          />
        </ListItemLink>
        <Divider />
        <ListItemLink href="/book">
          <ListItemText
            className={classes.list}
            primary="半沢直樹 アルルカンと道化師"
            classes={{ primary: classes.primary }}
          />
        </ListItemLink>
        <Divider />
      </List>
      <IconButton
        className="fa fa-plus-circle"
        color="primary"
        style={{ fontSize: 30 , position:"fixed" , bottom:100,marginLeft:400}}
        onClick={goform}
    />
    </div>
  </>
  );
}
