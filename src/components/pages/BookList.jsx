import React, { Children } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Class } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: 10,
  },
  // list: {
  //   // maxWidth: 400,
  //   display: "flex",
  //   whiteSpace: "nowrap",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  // },
  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

export default function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemText
            className={classes.list}
            primary="「MIU404」公式メモリアルブック Amazon限定表紙版"
            classes={{ primary: classes.primary }}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            className={classes.list}
            primary="「気がつきすぎて疲れる」が驚くほどなくなる 「繊細さん」の本"
            classes={{ primary: classes.primary }}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            className={classes.list}
            primary="半沢直樹 アルルカンと道化師"
            classes={{ primary: classes.primary }}
          />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}
