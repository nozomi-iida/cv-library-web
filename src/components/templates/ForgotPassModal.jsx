import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form"
import firebase from "../../firebase/firebase"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button:{
    width:"100%"
  },
  error:{
    color:"red"
  }
}));

export default function TransitionsModal() {
  const {register,handleSubmit} =useForm()
  const [error,set_err]=useState()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const submit=async (data)=>{
    try{
      await firebase.auth().sendPasswordResetEmail(data.email)
      window.alert("パスワード再設定メールが送信されました。ご確認ください")
      setOpen(false)
    }catch(err){
      console.log(err.code)
      switch(err.code){
        case "auth/invalid-email":
          set_err("正しいメールアドレスを入力してください")
        case "auth/user-not-found":
          set_err("ユーザーが見つかりません、登録しているメールアドレスを入力してください")
      }
    };
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        FORGOT PASSWORD
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={handleSubmit(submit)}>
            <p>登録したメールアドレスを入力して下さい</p>
      {error&& <p className={classes.error}>{error}</p>}
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
            <Button className={classes.button} type="submit" color="primary">password再設定メールを送信</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}