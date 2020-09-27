import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import Slider from "@material-ui/core/Slider";
import NoImage from "../../images/noImage.jpeg";

const Icon = () => {
  const [state, setState] = useState(NoImage);
  const [scale, setScale] = useState("");

  const handleDrop = (dropped) => {
    setState(dropped[0]);
  };
  const valuetext = (value) => {
    return setScale(value);
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
              scale={scale}
              width={150}
              height={150}
              borderRadius={75}
              image={state}
            />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <div style={{ width: 150, marginTop: 75, marginLeft: 30 }}>
        <Slider
          defaultValue={1}
          getAriaValueText={valuetext}
          min={1}
          max={10}
          valueLabelDisplay="auto"
        />
      </div>
      <input
        type="file"
        accept="Image/*"
        onChange={(e) => {
          setState(e.target.files[0]);
        }}
      />
    </>
  );
};

export default Icon;
