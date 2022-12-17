import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Notes: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [detailing, setDetailing] = useState<string>('');
  const [listNotes, setListNotes] = useState<string[]>([]);

  const [canNotSave, setCanNotSave] = useState(true);

  useEffect(() => {
    if (description.length > 3 && detailing.length > 0) {
      setCanNotSave(false);
    } else {
      setCanNotSave(true);
    }
  }, [description, detailing]);

  const handleClick = () => {
    if (!description || !detailing) {
      alert('Preencha os campos');
    }

    const myNote = `${description} ${detailing}`;

    setListNotes([...listNotes, myNote]);

    setDescription('');
    setDetailing('');
  };

  const handleDelete = (note: string) => {
    const newList = [...listNotes];

    newList.splice(newList.indexOf(note), 1);

    setListNotes(newList);
  };

  const handleEdit = () => {
    alert('Tá complicado');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Lista de Recados </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Descricão"
          value={description}
          onChange={ev => setDescription(ev.target.value)}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Detalhamento"
          value={detailing}
          onChange={ev => setDetailing(ev.target.value)}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <Button onClick={handleClick} variant="contained" disabled={canNotSave}>
          Salvar
        </Button>
      </Grid>
      <Grid item xs={12}>
        {listNotes.map(notes => (
          <div key={notes}>
            <h1>{notes}</h1>
            <Button onClick={handleEdit} variant="contained">
              Editar
            </Button>
            <Button sx={{ marginTop: '5px' }} onClick={() => handleDelete(notes)} variant="contained">
              Excluir
            </Button>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default Notes;
