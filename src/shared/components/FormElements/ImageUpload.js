import React, { useRef, useState, useEffect } from 'react';

import Button from '../../UIElements/Button';
import classes from './ImageUpload.module.css';

// let imageCleared = false;

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(props.initialValid);
  const [imageCleared, setImageCleared] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    console.log('props.initialValue: ', props.initialValue);
    console.log('file: ', file);

    // if (file === '') {
    //   setPreviewUrl('');
    //   setIsValid(false);
    //   return;
    // }

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file, props.initialValue]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      // imageCleared = false;
      setImageCleared(false);
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const clearImgHandler = () => {
    setFile('');
    setPreviewUrl('');
    setIsValid(false);
    setImageCleared(true);
    // imageCleared = true;
    props.onInput(props.id, '', false);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div
        className={`${classes['image-upload']} ${
          props.center && classes.center
        }`}
      >
        <div className={classes.preview}>
          {(props.initialValue || previewUrl) && !imageCleared && (
            <div className={classes.close} onClick={clearImgHandler}>
              <ion-icon size="small" src="/icons/trash-outline.svg"></ion-icon>
            </div>
          )}
          {!imageCleared && props.initialValue && !previewUrl && (
            <img src={props.initialValue} alt="Preview" />
          )}
          {!imageCleared && previewUrl && (
            <img src={previewUrl} alt="Preview" />
          )}
          {((!props.initialValue && !previewUrl) || imageCleared) && (
            <p>Please select an image.</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Browse Image
        </Button>
        {/* {!isValid && <p>{props.errorText}</p>} */}
      </div>
    </div>
  );
};

export default ImageUpload;
