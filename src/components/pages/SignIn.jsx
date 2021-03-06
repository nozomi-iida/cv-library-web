import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import firebase from "../../firebase/firebase";
import { AuthContext } from "../../store/authStore";
import { Redirect } from "react-router-dom";
import ForgotPassModal from "../templates/ForgotPassModal"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
}));

export default function SignIn({ history }) {
  const [error, setError] = useState("");
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const user = useContext(AuthContext);
  if (user) {
    return <Redirect to="/" />;
  }
  const onSubmit = (data) => {
    setError("");
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            setError("Emailが正しくありません");
            break;
          case "auth/user-not-found":
            setError("ユーザーがみつかりません");
            break;
          case "auth/wrong-password":
            setError("パスワードが違います");
            break;
          default:
        }
        console.log(err.code);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <span style={{ color: "red" }}>{error}</span>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({ required: true })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>
              メールアドレスを入力してください
            </span>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
          />
          {errors.password && (
            <>
              <span style={{ color: "red" }}>パスワードを入力してください</span>
              <br></br>
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <ForgotPassModal/>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => history.push("/signUp")}>
                アカウントを作成しますか？
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
