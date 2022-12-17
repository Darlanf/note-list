import { Button, Grid, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { NoteType } from '../../types';

interface FormNoteProps {
  action: (note: NoteType) => void;
}

const FormNote: React.FC<FormNoteProps> = ({ action }) => {
  const [detail, setDetail] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const inputDetail = useRef<HTMLInputElement | undefined>();
  const inputDescription = useRef<HTMLInputElement | undefined>();

  const handleClear = () => {
    setDetail('');
    setDescription('');
  };

  const handleSubmit = () => {
    if (detail.length < 3) {
      alert('Preencha o detalhe, min. 3 caractéres.');
      inputDetail.current?.focus();
      return;
    }

    if (description.length < 3) {
      alert('Preencha a descrição, min. 3 caractéres.');
      inputDescription.current?.focus();
      return;
    }

    action({ id: Math.floor(Date.now() / 1000), detail, description });
    handleClear();
  };

  return (
    <Grid container spacing={2} alignItems={'center'}>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={ev => setDetail(ev.target.value)}
          label="Detalhe"
          value={detail || ''}
          variant="outlined"
          inputRef={inputDetail}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={ev => setDescription(ev.target.value)}
          label="Descrição"
          value={description || ''}
          variant="outlined"
          inputRef={inputDescription}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container spacing={2}>
          <Grid item>
            <Button onClick={handleClear} variant="outlined">
              Limpar
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleSubmit} variant="contained">
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormNote;
