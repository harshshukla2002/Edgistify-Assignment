import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface State {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  token: string | null;
}

const initialState: State = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: false,
  isError: false,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.isLoading = true;
    },
    setAuthError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    setAuthUser: (state, action: PayloadAction<User | null>) => {
      state.isError = false;
      state.isLoading = false;
      state.user = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.isError = false;
      state.isLoading = false;
      state.token = action.payload;
    },
  },
});

export const { setAuthLoading, setAuthError, setAuthUser, setAuthToken } =
  authSlice.actions;
export default authSlice.reducer;
