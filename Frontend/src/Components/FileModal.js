import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {setOpenModal} from "../Slice/appSlice"
// import axios, { Axios } from 'axios';
import { borderRadius, width } from '@mui/system';
import {setFilesName,setSnackBarSuccess} from '../Slice/appSlice';
import { useEffect } from 'react';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  color:'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  fontSize: '3rem',
  alignContent:'space-around',
  alignItems: 'center',
  scrollY: 'smooth',
  borderRadius: '2%', 
  overflow: 'hidden',
  minHeight: '10rem',
  
};

export default function BasicModal()  {
    // const {show} = props;
    // const { openPopModal  } = useSelector((state) => state.centerStore);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
//   console.log(open, show);
//   const handleOpen = () => dispatch(setOpenModal(false));
  const handleClose = () =>  
  { 
    setOpen(false);
    dispatch(setOpenModal(false))
  }

    const [files, setFiles] = useState();
    // const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [previews, setPreviews] = useState([]);

    const handleMultipleChange = (event) => {
        console.log(event.target.files);
        setFiles([...event.target.files]);
        console.log(files);
        // const file = new FileReader();
      
        // file.onload = function() {
        //   setPreview(file.result);
        // }
      
        // file.readAsDataURL(event.target.files)
        // console.log(file);

            const selectedFiles = event.target.files;

            // Loop through each selected file
            const filePreviews = [];
            for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const reader = new FileReader();

            // Closure to capture the file and set the preview
            reader.onload = (function (file) {
                return function (e) {
                filePreviews.push(e.target.result);
                
                // If all files have been processed, update state
                if (filePreviews.length === selectedFiles.length) {
                    setPreviews(filePreviews);
                    // dispatch(setFilesName(filePreviews));
                    // dispatch(setFilesName(files));
                    // setFiles(Array.from(event.target.files));
                }
              };
            })(file);
            
            // Read the file as data URL
            reader.readAsDataURL(file);
            }

    };

    useEffect(() =>
    {
      console.log(files);
      // console.log(files?.name)
      // const tempfile = files.filter(())
      // dispatch(setFilesName(files));
    },[files])

    const handleMultipleSubmit = async (event) => {
            event.preventDefault();
            if ( typeof files === 'undefined' ) 
                return;
            const url = 'http://localhost:5000/uploadFiles';
            console.log(files,files.length, files[0])
            const formData = new FormData();
            for (let index = 0; index < files.length; index++) {
                console.log("came");
                // formData.append(`file${index}`, files[index]);
                formData.append(`file${index}`,files[index]);
                // console.log(files[index][name])
                // formData.append(`fileName${index}`, files[index][name]);
            };

            console.log(formData);
            console.log("HI",[...formData.entries()]);


            fetch('http://localhost:5000/uploadFiles', {
            method: 'POST',
            body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                dispatch(setFilesName(files));
                dispatch(setSnackBarSuccess(true));
                handleClose();  // Closing of Popup on successfull uploading
            })
            .catch(error => {
                console.error(error);
            });


            // const res = await fetch(
            //     url,
            //     {
            //       method: 'POST',
            //     //   mode: 'cors',
            //       headers: {
            //         'content-Type': 'multipart/form-data',
            //       },
            //       body:formData,
            //     }
            //   ).then((data) => { data.json(); console.log(data.json()) });
            //   return res;

        //     const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //     },
        // };
        //     axios.post(url, formData, config)
        //     .then((response) => {
        //       console.log(response.data);
        //       setUploadedFiles(response.data.files);
        //     })
        //     .catch((error) => {
        //       console.error("Error uploading files: ", error);
        //     });
    }

    // function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    //     const target = e.target as HTMLInputElement & {
    //       files: FileList;
    //     }
      
    //     setFile(target.files[0]);
      
    //     const file = new FileReader;
      
    //     file.onload = function() {
    //       setPreview(file.result);
    //     }
      
    //     file.readAsDataURL(target.files[0])
    //   }


  return (
    <div>
      <Modal
        open={open}
        // open={openPopModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <form onSubmit={handleMultipleSubmit} style={{ alignItems: 'center', marginBottom: '10px', display: 'grid', padding: '6px 5px', margin: '3rem 3rem', alignContent:'space-around'}}>
            {/* <h1>File Upload Here</h1> */}
            <Typography id="modal-modal-title" variant="h2" component="h2">Upload File Here</Typography>
            <input type="file" multiple  onChange={handleMultipleChange} name='file' style={{fontSize: '2rem', margin: '2rem 4rem'}} />
            {/* <p>After choosen the file click on Upload</p> */}
            <Typography id="modal-modal-title" variant="h2" component="h2">After choosing the file click on Upload</Typography>

        {/* {preview && (
          <p><img src={preview} alt="Upload preview"   style={{ maxWidth: '100%' }}   /></p>
        )} */}

        {previews.map((preview, index) => (
          <div key={index} style={{ display: 'grid', alignItems: 'center', marginBottom: '10px' }} >
                    {/* <p style={{ marginRight: '10px', mt:3 }}>{files[index].name}</p> */}
                    <Typography id="modal-modal-title" variant="h4" component="h4">{files[index].name}</Typography>
                    <img src={preview} alt={`Preview ${index}`} style={{ maxWidth: '100%', maxHeight:'80%'}} />
                </div>
            ))}
            <button type="submit" style={{width: '16rem', height: '5rem', fontSize: '3rem'}} >Upload</button>

        </form>
        {/* {uploadedFiles.map((file, index) => (
            <img key={index} src={file} alt={`Uploaded content ${index}`} />
        ))} */}

           
          {/* <Typography id="modal-modal-title" variant="h2" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Typography id="moddal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography><Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography><Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}