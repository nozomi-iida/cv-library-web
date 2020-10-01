import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import IconModal from "../templates/IconModal";
import firebase from "../../firebase/firebase";
import NoImage from "../../images/noImage.jpeg";
import  {fireStorage}  from "../../firebase/firebase";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [file,setFile]=React.useState(NoImage)
  const [image, setImage] = React.useState(NoImage);
  const [userImageURL,setUserImageURL]=React.useState("")
  const [error, setError] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    data.confirmpassword !== data.password &&
      setError("passwordと一致しません");
    console.log(data);
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(({ user }) => {
        fireStorage
          .ref()
          .child(user.uid)
          .put(file)
          .then((snapshot) => {
            const url = snapshot.ref.getDownloadURL();
            console.log(url); // ダウンロードURL
            setUserImageURL(url)
          })
          .catch((er) => {
            console.log(er);
            // error
          });
        user.updateProfile({
          displayName: data.Name,
          email: data.email,
          photoURL:userImageURL,
        });
      })
      .catch((err) => {
        console.log(err);
      });
      
      console.log(image);
      console.log(file)
  };
  const addFile=(file)=>{
    setFile(file)
  }
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <IconModal addFile={addFile} setImage={setImage} image={image} />
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                inputRef={register({ required: true })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>名前を入力してください</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({ required: true })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>
                  メールアドレスを入力してください
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({ required: true })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>
                  パスワードを入力してください
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmpassword"
                label="confirmPassword"
                type="password"
                id="confirmpassword"
                autoComplete="confirmpassword"
                inputRef={register({ required: true })}
              />
              <span>{error}</span>
              {errors.email && (
                <span style={{ color: "red" }}>
                  パスワード(確認用)を入力してください
                </span>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                アカウントをすでにお持ちですか？
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
