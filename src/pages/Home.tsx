import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import FormNote from '../components/FormNote/FormNote';
import { NoteType } from '../types/index';
import ItemNote from '../components/ItemNote/ItemNote';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { addNote, deleteNote, selectNotes, updateNote } from '../store/modules/NotesSlice';
// import Message from '../components/Message';
// import { setMessage } from '../store/modules/MessageSlice';
import { AlternateEmail } from '@mui/icons-material';
import { logoff } from '../store/modules/LoginSlice';

const Home: React.FC = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const contactsRedux = useAppSelector(selectNotes);
  const loginRedux = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginRedux.logged) {
      navigate('/login');
    }
  }, [loginRedux, navigate]);

  const handleLogOff = () => {
    dispatch(logoff());
  };

  const handleAddContact = useCallback((note: NoteType) => {
    dispatch(addNote(note));
  }, []);

  const handleDeleteNote = useCallback((note: NoteType) => {
    dispatch(deleteNote(note.id));
  }, []);

  const openEditModal = useCallback(() => {
    setOpenEdit(true);
  }, []);

  // const handleEditContact = useCallback(
  //   (contact: ContactType) => {
  //     dispatch(
  //       updateContact({
  //         id: contact.phone,
  //         changes: {
  //           name: `${contact.name} Editado`,
  //         },
  //       })
  //     );
  //   },
  //   []
  // );

  const handleClose = () => {
    setOpenEdit(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormNote action={handleAddContact} />
        {/* <Message /> */}
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: '5px' }}>
          {contactsRedux.map(item => {
            return (
              <ItemNote
                key={item.id}
                note={item}
                actionDelete={() => handleDeleteNote(item)}
                actionEdit={openEditModal}
              />
            );
          })}
        </Paper>
      </Grid>
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" onClick={handleLogOff}>
        Sair
      </Button>
    </Grid>
  );
};

export default Home;
