import React, { useState } from 'react';
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
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    if (data.confirmpassword !== data.password) {
      return setError('passwordと一致しません');
    }
    if (image === '') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(({ user }) => {
          user.updateProfile({
            displayName: data.Name,
            photoURL: '',
          });
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
  const classes = useStyles();

  console.log(firebase.auth().currentUser);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <IconModal addFile={addFile} setImage={setImage} image={image} />
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='name'
                name='Name'
                variant='outlined'
                fullWidth
                id='Name'
                label='Name'
                autoFocus
                inputRef={register({ required: true })}
              />
              {errors.email && (
                <span style={{ color: 'red' }}>名前を入力してください</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                inputRef={register({ required: true })}
              />
              {errors.email && (
                <span style={{ color: 'red' }}>
                  メールアドレスを入力してください
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                inputRef={register({ required: true })}
              />
              {errors.email && (
                <span style={{ color: 'red' }}>
                  パスワードを入力してください
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='confirmpassword'
                label='confirmPassword'
                type='password'
                id='confirmpassword'
                autoComplete='confirmpassword'
                inputRef={register({ required: true })}
              />
              <span>{error}</span>
              {errors.email && (
                <span style={{ color: 'red' }}>
                  パスワード(確認用)を入力してください
                </span>
              )}
            </Grid>
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='#' variant='body2'>
                アカウントをすでにお持ちですか？
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
