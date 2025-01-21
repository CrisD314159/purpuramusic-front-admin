'use client'
import { DialogContent, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddSongDialogForm from './dialogForms/AddSongDialogForm';

interface AddSongDialogProps {
  albumid:string,
  defaultArtist?: string,
  defaultGenre?: string,
}

export default function AddSongDialog({props}:{props:AddSongDialogProps}) {
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
       <IconButton color='info' onClick={handleClickOpen}>
              <AddIcon/>
        </IconButton> 
          
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Add Song to album
        </DialogTitle>
        <DialogContent>
          <AddSongDialogForm props={{albumid:props.albumid, defaultArtists:props.defaultArtist, defaultGenre:props.defaultGenre }}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button color='success' autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
