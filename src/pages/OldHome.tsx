import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Home: React.FC = () => {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [usersList, setUsersList] = useState<string[]>([]);

  const validateRegister = () => {
    if (!username || !password) {
      alert('Tá dando ruim. Preenche os campos ai!');
      return;
    }
    const data = `${username} ${password}`;

    const exist = usersList.find(user => user === data);

    if (exist) {
      alert('Pessoa já cadastrada!');
      return;
    }

    setUsersList([...usersList, data]);
    console.log(usersList);
  };

  const handleClick = () => {
    pathName != '/' ? validateRegister() : navigate('/todolist');
  };

  return (
    <Container maxWidth="sm" className="Container">
      <Grid container className="CardLogin">
        <Grid item xs={12} my={6}>
          <Typography variant="h3">{pathName == '/' ? 'Login' : 'Registro'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            value={username}
            onChange={ev => setUsername(ev.target.value)}
            label="Usuário"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} my={4}>
          <TextField
            id="outlined-basic"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            label="Senha"
            variant="outlined"
            type="password"
          />
        </Grid>
        {pathName != '/' && (
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              // value={confirmPassword}
              // onChange={ev => setConfirmPassword(ev.target.value)}
              label="Confirme a senha"
              variant="outlined"
              type="password"
            />
          </Grid>
        )}
        <Grid item xs={8} mt={2}>
          <Button onClick={handleClick} variant="contained">
            {pathName == '/' ? 'Entrar' : 'Registrar'}
          </Button>
        </Grid>
        <Grid item xs={8} my={2}>
          {pathName == '/' ? (
            <Link to="/register">
              <Button variant="contained">Registrar</Button>
            </Link>
          ) : (
            <Link to="/">
              <Typography variant="overline">Já possui conta? Faça seu login</Typography>
            </Link>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
