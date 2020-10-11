import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector } from "react-redux";
import BookListItem from "../templates/ListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: 10,
    position: "relative",
  },
  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  addButton: {
    fontSize: 30,
    position: "fixed",
    right: "0%",
    bottom: "7%",
  },
}));

export default function SimpleList({ history }) {
  const books = useSelector((state) => state.books);
  const classes = useStyles();
  const goform = () => {
    history.push("/add");
  };
  let status = useSelector((state) => state.status);

  if (status === 0) {
    status = "読みたい本";
  } else if (status === 1) {
    status = "読了";
  }

  return (
    <>
      <div className={classes.root}>
        <List component="nav">
          {books !== undefined &&
            books
              .sort(function (a, b) {
                if (a.time < b.time) return 1;
                if (a.time > b.time) return -1;
                return 0;
              })
              .map((book) => {
                if (book.status === status) {
                  return <BookListItem book={book} key={book.id} />;
                } else {
                  return null
                }
              })}
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
