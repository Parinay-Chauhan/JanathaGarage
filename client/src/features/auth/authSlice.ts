import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/api.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Retrieve any cached token and user from localStorage on init
const savedToken = localStorage.getItem("jg_access_token");
const savedUser = localStorage.getItem("jg_user");

let initialUser: User | null = null;
try {
  if (savedUser) initialUser = JSON.parse(savedUser);
} catch (e) {
  initialUser = null;
}

const initialState: AuthState = {
  user: initialUser,
  accessToken: savedToken || null,
  isAuthenticated: !!savedToken && !!initialUser,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken?: string }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;

      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("jg_access_token", action.payload.accessToken);
      }
      localStorage.setItem("jg_user", JSON.stringify(action.payload.user));
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("jg_user", JSON.stringify(state.user));
      }
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("jg_access_token");
      localStorage.removeItem("jg_user");
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, updateUser, logOut, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
