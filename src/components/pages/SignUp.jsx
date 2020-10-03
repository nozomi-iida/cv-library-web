import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import IconModal from '../templates/IconModal';
import firebase from '../../firebase/firebase';
import { fireStorage } from '../../firebase/firebase';
import { AuthContext } from '../../store/authStore';
import { Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 60,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const user = useContext(AuthContext);
  var emailreg=/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  const { register, handleSubmit, errors } = useForm();
  if(user){
    return<Redirect to="/"/>
  }
  const onSubmit = data => {
    setError("")
    if (data.confirmpassword !== data.password) {
      return setError('PasswordとconfirmPasswordが一致しません');
    }else if(data.password.length < 6){
      return setError("Passwordを６文字以上にしてください")
    }else if(emailreg.test(data.email)){
    }else{
      return setError("Emailが正しくありません")
    }
    
    if (image === '') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(({ user }) => {
          user.updateProfile({
            displayName: data.Name,
            photoURL: "",
          });
          history.push('/');
        })
        .catch((er) => {
          switch(er.code){
            case "auth/email-already-in-use":
              setError("このemailはすでに使用されています")
              break
            }
          // error
        });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(({ user }) => {
          fireStorage
            .ref()
            .child(user.uid)
            .put(file)
            .then(snapshot => {
              snapshot.ref.getDownloadURL();
            })
            .then(downloadURL => {
              user.updateProfile({
                displayName: data.Name,
                photoURL: downloadURL,
              });
              history.push('/');
            })
            .catch(er => {
              console.log(er);
              // error
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const addFile = file => {
    setFile(file);
  };
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
        <span style={{ color: "red" }}>{error}</span>
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
              {errors.Name && (
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
              {errors.password && (
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

              {errors.confirmpassword && (
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
              <Button color="primary" onClick={()=>history.push("/signIn")}>
                アカウントをすでにお持ちですか？
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
