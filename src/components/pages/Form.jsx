import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../store/authStore";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function Form({ history }) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [urlerror, setUrlerror] = useState("");
  const user = useContext(AuthContext);
  const sampleUrl = new RegExp("^https://www.amazon.co.jp/.");
  const onSubmit = (data) => {
    if (sampleUrl.test(data.url)) {
      const now = new Date();
      firebase.firestore().collection("books").add({
        username: user.displayName,
        userid: user.uid,
        reviews: 0,
        status: "読みたい本",
        impression: "",
        title: data.title,
        url: data.url,
        details: data.details,
        reason: data.reason,
        time: now,
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
            inputRef={register({ required: true })}
          />

          {errors.title && (
            <span className={classes.font}>タイトルを入力してください</span>
          )}
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
            inputRef={register({ required: true })}
          />
          {errors.url && (
            <span className={classes.font}>AmaszonのURLを入力してください</span>
          )}
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
            inputRef={register({ required: true })}
          />
          {errors.details && (
            <span className={classes.font}>
              本の簡単な詳細を入力してください
            </span>
          )}
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
            inputRef={register({ required: true })}
          />
          {errors.reason && (
            <>
              <span className={classes.font}>
                読みたい理由を入力してください
              </span>
              <br />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            追加する
          </Button>
        </form>
      </div>
    </Container>
  );
}
