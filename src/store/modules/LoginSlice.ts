import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LoginType from '../../types/LoginType';

const initialState: LoginType = {
  email: '',
  password: '',
  confirmPassword: '',
  logged: false
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    register(state, action: PayloadAction<LoginType>) {
      return action.payload;
    },
    login(state) {
      state.logged = true;
    },
    logoff(state) {
      state.logged = false;
    }
    // logoff() {
    //   return initialState;
    // }
  }
});

export const { register, login, logoff } = loginSlice.actions;
export default loginSlice.reducer;
