import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useCallback, useState } from 'react';
import { NoteType } from '../../types';
import { deleteNote, selectNotes, updateNote } from '../../store/modules/NotesSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

interface ItemNoteProps {
  note: NoteType;
}

const ItemNote: React.FC<ItemNoteProps> = ({ note }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const notesRedux = useAppSelector(selectNotes);
  const loginRedux = useAppSelector(state => state.login);
  const [editDetail, setDetail] = useState<string>('');
  const [editDescription, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleDeleteNote = useCallback((note: NoteType) => {
    const deleted = confirm('Deseja deletar essa nota?');
    if (deleted) {
      dispatch(deleteNote(note.id));
      alert('Nota apagada!');
    }
  }, []);

  const openEditModal = useCallback((note: NoteType) => {
    setOpenEdit(true);
    setDetail(note.detail);
    setDescription(note.description);
  }, []);

  const handleEditNote = () => {
    if (!editDetail || editDetail.length < 3) {
      alert('Detalhe inválido! \nPreencha com pelo menos 3 caractéres');
      return;
    }
    if (!editDescription || editDescription.length < 3) {
      alert('Descrição inválida! \nPreencha com pelo menos 3 caractéres');
      return;
    }
    dispatch(
      updateNote({
        id: note.id,
        changes: {
          detail: editDetail,
          description: editDescription
        }
      })
    );
    alert('Nota editada!');
    setOpenEdit(false);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton onClick={() => openEditModal(note)} edge="end" aria-label="edit" sx={{ paddingRight: '20px' }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteNote(note)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText primary={note.detail} secondary={note.description} />
      </ListItem>
      <Divider variant="inset" />
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edite seu recado!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="detalhe"
            label="Detalhe"
            type="text"
            value={editDetail || ''}
            onChange={ev => setDetail(ev.target.value)}
            inputProps={{ maxLength: 200 }}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            type="text"
            value={editDescription || ''}
            onChange={ev => setDescription(ev.target.value)}
            inputProps={{ maxLength: 300 }}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => handleEditNote()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemNote;
