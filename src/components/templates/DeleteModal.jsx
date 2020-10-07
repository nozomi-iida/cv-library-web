import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent:"left"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    borderRadius: 3,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: 20,
    width: 220,
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    width: 76,
    height: 28,
  },
}));
export default function DeleteModal({ open, setOpen }) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3>本当に削除しますか？</h3>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
              >
                はい
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                いいえ
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
