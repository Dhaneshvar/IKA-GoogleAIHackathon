import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarSuccess } from '../Slice/appSlice';

export default function CustomizedSnackbars({message,errorType, horizontalValue, verticalValue}) {

  const { snackBarSuccess } = useSelector((state) => state.centerStore);

  const dispatch = useDispatch();

  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
    dispatch(setSnackBarSuccess(false));
  };

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar 
        open={snackBarSuccess} 
        autoHideDuration={6000} 
        onClose={handleClose}
        sx={{fontSize: '1.7rem'}}
        anchorOrigin={{
          horizontal: horizontalValue,
          vertical: verticalValue,
      }}
      >
        <Alert
          onClose={handleClose}
          severity={errorType}
          variant="filled"
          
          sx={{ width: '100%', fontSize: '1.7rem' }}
        >
          {message}
          {/* Your file Has been Uploaded Successfull !! */}
        </Alert>
      </Snackbar>
    </div>
  );
}
