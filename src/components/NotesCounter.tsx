import React from 'react';
import Badge from '@mui/material/Badge';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import { useAppSelector } from '../store/hooks';
import { selectNotes } from '../store/modules/NotesSlice';

const NotesCounter: React.FC = () => {
  const notesRedux = useAppSelector(selectNotes);

  return (
    <Badge badgeContent={notesRedux.length} color="secondary">
      <FormatListNumberedRtlIcon />
    </Badge>
  );
};

export default NotesCounter;
