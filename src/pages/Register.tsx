import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { register } from '../store/modules/LoginSlice';

const Register: React.FC = () => {
  const [email, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const loginRedux = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginRedux.logged) {
      navigate('/');
    }
  }, [loginRedux, navigate]);

  const handleRegister = () => {
    if (email.length >= 6 && password.length >= 6 && password === confirmPassword) {
      dispatch(
        register({
          email,
          password,
          confirmPassword,
          logged: false
        })
      );
      navigate('/login');
    }
  };
  const handleToLogin = () => {
    navigate('/login');
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
              Cadastre seu email e senha!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              onChange={ev => setMail(ev.target.value)}
              label="Email"
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
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              onChange={ev => setconfirmPassword(ev.target.value)}
              label="Confirme sua Senha"
              value={confirmPassword || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid xs={12} item display="flex" justifyContent="space-evenly">
                <Button onClick={handleRegister} variant="contained">
                  Cadastrar
                </Button>
                <Button variant="text" onClick={handleToLogin}>
                  Já possui conta? Faça login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
