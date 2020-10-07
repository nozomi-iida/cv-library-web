import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
const ReadForm = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
    display: 'flex',
    alignItems:"center",

    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    }},
    paper: {
      marginTop: theme.spacing(8),
      alignItems: "center",
      paddingBottom: 40,
    },
    back:{
      padding:0,
    },
    ryou:{
      paddingLeft:40,
    },
    text:{
      marginTop:theme.spacing(2),
      display:"flex",
      justifyContent:"center",
      marginRight:"auto",
      marginLeft:"auto",
      maxWidth:"30ch",
    },
    centerbutton:{
      display:"flex",
      justifyContent:"center",
    }
  }));
  const classes = useStyles();
  const handleSubmit=()=>{

  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Button className={classes.back}>←戻る</Button>
        <h3 className={classes.ryou}>読了*</h3>
        <div className={classes.root}>
          <Rating
            name="half-rating"
            size="large"
            defaultValue={2.5}
            precision={0.5}
            style={{ fontSize: 40 }}
          />
        </div>
        <h3 className={classes.ryou}>感想*</h3>
        <TextField
          className={classes.text}
          id="outlined-multiline-static"
          multiline
          rows={8}
          variant="outlined"
        />
      </div>
      <div className={classes.centerbutton}>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        読了
      </Button>
      </div>
    </Container>
  );
};

export default ReadForm;
