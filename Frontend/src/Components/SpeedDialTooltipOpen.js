import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import BasicModal from "./FileModal";
import { useEffect } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {setOpenModal} from "../Slice/appSlice"
import { green } from '@mui/material/colors';

import ScrollDialog from "./DialogScroll";


const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon : <AttachFileIcon />, name: 'File Attach'},
];

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch();
    const { openPopModal  } = useSelector((state) => state.centerStore);

    useEffect(() =>
    {
        if(openPopModal)
        {
            console.log("openPopModal", openPopModal)
            // dispatch(setOpenModal(false));
        }
    },[openPopModal, dispatch])

    const handleModalOpen = () =>{
        console.log("d")
        dispatch(setOpenModal(true));
        console.log(openPopModal);
    }

  return (
    <Box sx={{ height: 100, transform: 'translateZ(3px)', flexGrow: 1, position: 'absolute' }}>
      <Backdrop open={open} />
      {/* {openPopModal ? <BasicModal show={modalShow} onHide={() => setModalShow(false)} /> : "" } */}
      {/* {openPopModal ?  <BasicModal  /> : ""} */}
      {openPopModal ?  <ScrollDialog /> : "" }

      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 18, right: 18}}
        icon={<SpeedDialIcon  sx={{fontSize: '1.5rem', color: 'white'}} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        >
        {/* {actions.map((action) => (
            <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
            />
        ))} */}
         <SpeedDialAction
            key="File Attach"
            icon={<AttachFileIcon />}
            tooltipTitle="File Attach"
            tooltipOpen
            onClick={handleModalOpen}
            // onClick={setModalShow(true)}
            // onClick={handleClose}
            />
      </SpeedDial>
    </Box>
  );
}
