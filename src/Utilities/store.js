import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';


const initialState = {
  movies: [],
  genresLoaded: [],
  genres: [],
};

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {},
})

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
