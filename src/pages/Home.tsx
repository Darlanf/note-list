import React, { useCallback, useEffect } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import FormNote from '../components/FormNote/FormNote';
import { NoteType } from '../types/index';
import ItemNote from '../components/ItemNote/ItemNote';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { addNote, selectNotes } from '../store/modules/NotesSlice';
import { logoff } from '../store/modules/LoginSlice';

const Home: React.FC = () => {
  const notesRedux = useAppSelector(selectNotes);
  const loginRedux = useAppSelector(state => state.login);
  const userLogged = loginRedux.userList.find(user => user.logged);
  const userNote = notesRedux.filter(note => note.user === userLogged?.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      navigate('/login');
    }
  }, [loginRedux, navigate]);

  const handleLogOff = () => {
    dispatch(logoff());
  };

  const handleAddNote = useCallback((note: NoteType) => {
    dispatch(addNote(note));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormNote action={handleAddNote} />
      </Grid>
      {userNote && (
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ padding: '5px' }}>
            {userNote.map(item => {
              return <ItemNote key={item.id} note={item} />;
            })}
          </Paper>
        </Grid>
      )}
      <Button variant="contained" onClick={handleLogOff}>
        Sair
      </Button>
    </Grid>
  );
};

export default Home;
