import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import firebase from "../../firebase/firebase";
import { useSelector } from "react-redux";
const ReadForm = ({ history }) => {
  const { register, handleSubmit } = useForm();
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",

      flexDirection: "column",
      "& > * + *": {
        marginTop: theme.spacing(1),
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      alignItems: "center",
      paddingBottom: 40,
    },
    back: {
      padding: 0,
    },
    ryou: {
      paddingLeft: 40,
    },
    text: {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: "30ch",
    },
    centerbutton: {
      display: "flex",
      justifyContent: "center",
    },
  }));
  const classes = useStyles();
  const { id } = useParams();
  const [rating, setRating] = useState(2.5);
  const books = useSelector((state) => state.books);
  const book = books.find((b) => b.documentId === id);
  const docid = book.documentId;
  const onSubmit = (data) => {
    firebase.firestore().collection("books").doc(docid).update({
      status: "読了",
      impression: data.text,
      reviews: rating,
    });
    history.push(`/`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Button
          onClick={() => history.push(`/book/${id}`)}
          className={classes.back}
        >
          ←戻る
        </Button>
        <h3 className={classes.ryou}>読了*</h3>
        <form>
          <div className={classes.root}>
            <Rating
              name="reviews"
              size="large"
              defaultValue={2.5}
              precision={0.5}
              style={{ fontSize: 40 }}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>
          <h3 className={classes.ryou}>感想*</h3>
          <TextField
            name="text"
            className={classes.text}
            id="outlined-multiline-static"
            multiline
            rows={8}
            variant="outlined"
            inputRef={register({ required: true })}
          />
        </form>
      </div>
      <div className={classes.centerbutton}>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          読了
        </Button>
      </div>
    </Container>
  );
};

export default ReadForm;
