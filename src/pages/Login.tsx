import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { login } from '../store/modules/LoginSlice';

const Login: React.FC = () => {
  const [email, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const loginRedux = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = loginRedux.userList.findIndex(user => user.logged);
    if (userLogged !== -1) {
      navigate('/');
    }
  }, [loginRedux, navigate]);

  const handleLogin = () => {
    if (email.length < 6 || password.length < 6) {
      alert('Preencha os campos corretamente ou crie uma nova conta');
    } else {
      const userExist = loginRedux.userList.findIndex(user => user.email === email);
      if (userExist === -1) return alert('Usuario não encontrado');
      const isPasswordOk = loginRedux.userList[userExist].password === password;
      if (!isPasswordOk) return alert('Senha incorreta');
      dispatch(login(email));
      navigate('/');
    }
  };
  const handleToRegister = () => {
    navigate('/register');
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh', padding: '0 20px' }} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <AdbIcon fontSize="large" />
            <Typography variant="h4">GrowNotes</Typography>
          </Grid>
          <Grid item xs={12} alignItems="center">
            <Typography variant="h6" align="center">
              Utilize seu email e senha para logar!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              onChange={ev => setMail(ev.target.value)}
              label="Login"
              value={email || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              onChange={ev => setPassword(ev.target.value)}
              label="Senha"
              value={password || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid xs={12} item display="flex" justifyContent="space-evenly">
                <Button onClick={handleLogin} variant="contained">
                  Logar
                </Button>
                <Button variant="text" onClick={handleToRegister}>
                  Não possui conta? Cadastre-se agora!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
