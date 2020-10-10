import React from "react";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: "100%",
    margin: "auto",
    marginTop: 10,
    justifyContent: "center",
    paddingBottom: 60,
  },
  head: {
    display: "flex",
  },
  back: {
    padding: 0,
  },
  text: {
    margin: 0,
    marginLeft: 50,
  },
  details: {
    fontWeight: "normal",
  },
}));

export default function Description({ history }) {
  const classes = useStyles();
  const { id } = useParams();
  const books = useSelector((state) => state.books);
  const book = books.find((b) => b.id === id);
  const handleBack = () => {
    history.push(`/book/${book.id}`);
  };
  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <Button className={classes.back} onClick={handleBack}>
          ←戻る
        </Button>
        <h2 className={classes.text}>本の簡単な概要</h2>
      </div>
      <h3 className={classes.details}>{book.details}</h3>
    </div>
  );
}
