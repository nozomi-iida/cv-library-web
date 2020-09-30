import React from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));


const Icon = ({image,handleDrop,addImage,handleClose}) => {
   const classes = useStyles();
  const Change=(file)=>{
    addImage(file)
}




  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        noClick
        noKeyboard
        style={{ width: "150px", height: "150px" }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <AvatarEditor
              id="Editor"
              width={150}
              height={150}
              borderRadius={75}
              image={image}
            />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <div className={classes.root}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          accept="Image/*"
          onChange={(e) => Change(e.target.files[0])}
        />
        <label
          style={{ justifyContent: "center", display: "flex" }}
          htmlFor="contained-button-file"
        >
          <Button variant="contained" color="primary" component="span">
            ファイル
          </Button>             
          <Button style={{marginLeft:15}} color="primary" variant="contained" onClick={handleClose}>
            決定
          </Button>
        </label>
      </div>
    </>
  );
};

export default Icon;
