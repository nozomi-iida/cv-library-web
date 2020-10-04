import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useDispatch, useSelector} from "react-redux"
import firebase from "../../firebase/firebase"
import {BookAddAction}from "../../reducks/books/actions"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: '100vh', 
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: 10,
    position: 'relative',
  },
  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  addButton: {
    fontSize: 30, 
    position: "fixed", 
    right: '0%',
    bottom: '7%',
  }
}));


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList({history}) {

  const selector = useSelector((state) => state);
  const dispatch=useDispatch()
  useEffect(() => {
    firebase
      .firestore()
      .collection("books")
      .onSnapshot((snapshot) => {
        const books = snapshot.docs.map((doc) => {
          return doc.data();
        });
        dispatch(BookAddAction(books));
      });
  }, []);
  const classes = useStyles();
  const goform = () => {
    history.push("/add");
  };
  console.log(selector.books)
  
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
        className={classes.addButton}
        color="primary"
        onClick={goform}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
    </div>
  </>
  );
}
