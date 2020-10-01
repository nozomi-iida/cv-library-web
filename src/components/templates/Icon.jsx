import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Icon = ({ image, handleDrop, addImage, handleClose,addFile }) => {
  const classes = useStyles();
  const [editor, setImg] = useState(null);
  const Change = (file) => {
    addImage(file);
    addFile(file)
  };
  const aaa = () => {
    const canvas = editor.getImage().toDataURL();
    fetch(canvas)
      .then((res) => res.blob())
      .then((blob) => handleDrop([window.URL.createObjectURL(blob)]));
    handleClose();
  };

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
              width={150}
              height={150}
              borderRadius={75}
              image={image}
              ref={(editor) => {
                console.log(editor);
                setImg(editor);
              }}
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
          <Button
            style={{ marginLeft: 15 }}
            color="primary"
            variant="contained"
            onClick={aaa}
          >
            決定
          </Button>
        </label>
      </div>
    </>
  );
};

export default Icon;
