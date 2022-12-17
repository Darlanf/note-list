import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { NoteType } from '../../types';

interface ItemNoteProps {
  note: NoteType;
  actionDelete: (note: NoteType) => void;
  actionEdit: () => void;
}

const ItemNote: React.FC<ItemNoteProps> = ({ note, actionDelete, actionEdit }) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton onClick={() => actionEdit()} edge="end" aria-label="edit" sx={{ paddingRight: '20px' }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => actionDelete(note)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        {/* <ListItemAvatar>
          <Avatar alt={note.} />
        </ListItemAvatar> */}
        <ListItemText primary={note.detail} secondary={note.description} />
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

export default ItemNote;
