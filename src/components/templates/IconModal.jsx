import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Icon from "./Icon"
import NoImage from "../../images/noImage.jpeg";

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
}));

export default function IconModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(NoImage);
  const createObjectURL =
    (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const addImage=(file)=>{
    const URL=createObjectURL(file)
    setImage(URL)
    console.log(URL)
  }
  
    
  const handleDrop = (dropped) => {
    setImage(dropped[0]);
  };

  return (
    <div>
      <img type="button" style={{width:200,height:200,borderRadius:100}} src={image} onClick={handleOpen}/>
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
            <Icon image={image} addImage={addImage} handleClose={handleClose} handleDrop={handleDrop}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}