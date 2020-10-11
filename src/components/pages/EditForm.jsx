import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import firebase from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 70,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  font: {
    color: "red",
  },
}));

export default function EditForm({ history }) {
  const { id } = useParams();
  const books = useSelector((state) => state.books);
  const book = books.find((b) => b.documentId === id);
  const docid = book.documentId;
  const classes = useStyles();
  const handleBack=()=>{
    history.push("/")
  }
  const { register, handleSubmit } = useForm();
  const [urlerror, setUrlerror] = useState("");
  const sampleUrl = new RegExp("^https://www.amazon.co.jp/.");
  const onSubmit = (data) => {
    if (!data.title) {
      data.title = book.title;
    }
    if (!data.url) {
      data.url = book.url;
    }
    if (!data.details) {
      data.details = book.details;
    }
    if (!data.reason) {
      data.reason = book.reason;
    }
    if (sampleUrl.test(data.url)) {
      firebase.firestore().collection("books").doc(docid).update({
        title: data.title,
        url: data.url,
        details: data.details,
        reason: data.reason,
      });
      history.push("/");
    } else {
      setUrlerror("err");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
      <Button className={classes.back} onClick={handleBack}>
        ←戻る
      </Button>
          <h3
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: 0,
              fontWeight: "normal",
            }}
          >
            タイトル*
          </h3>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="title"
            name="title"
            autoComplete="title"
            autoFocus
            placeholder={book.title}
            inputRef={register}
          />
          <h3
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: 0,
              fontWeight: "normal",
            }}
          >
            AmaszonのURL*
          </h3>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="url"
            type="url"
            id="url"
            placeholder={book.url}
            inputRef={register}
          />
          {urlerror && (
            <span className={classes.font}>URLが間違っています</span>
          )}
          <h3
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: 0,
              fontWeight: "normal",
            }}
          >
            本の簡単な詳細*
          </h3>
          <TextField
            variant="outlined"
            required
            fullWidth
            multiline
            rows={5}
            name="details"
            type="details"
            id="details"
            placeholder={book.details}
            inputRef={register}
          />

          <h3
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: 0,
              fontWeight: "normal",
            }}
          >
            読みたい理由*
          </h3>
          <TextField
            variant="outlined"
            required
            fullWidth
            multiline
            rows={5}
            name="reason"
            type="reason"
            id="reason"
            placeholder={book.reason}
            inputRef={register}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            更新
          </Button>
        </form>
      </div>
    </Container>
  );
}
