import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchGetAllContests = createAsyncThunk(
  "news/fetchGetAllContests",
  async () => {
    const { data } = await axios.get("/api/contest/all");
    return data;
  }
);

export const fetchCreateContest = createAsyncThunk(
  "news/fetchCreateContest",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/contest", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSetContest = createAsyncThunk(
  "news/fetchSetContest",
  async (params, { rejectWithValue }) => {
    try {
      console.log('id', params, 'params')
      const response = await axios.patch(`/api/contest/set`, params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);



const initialState = {
  contest: {
    items: [],
    status: "loading",
    error: "",
  },
};

const contestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetAllContests.pending]: (state) => {
      state.contest.items = [];
      state.contest.status = "loading";
      state.contest.error = "";
    },
    [fetchGetAllContests.fulfilled]: (state, action) => {
      state.contest.status = "loaded";
      state.contest.items = action.payload;
    },
    [fetchGetAllContests.rejected]: (state, action) => {
        state.contest.items = [];
      state.contest.status = "error";
      state.contest.error = action.payload;
    },

    [fetchCreateContest.pending]: (state) => {
      state.status = "loading";
      state.contest = null;
    },
    [fetchCreateContest.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.contest = action.payload;
    },
    [fetchCreateContest.rejected]: (state) => {
      state.status = "error";
      state.contest = null;
    },

    [fetchSetContest.pending]: (state) => {
      state.contest.status = "loading";
      state.contest.error = "";
    },
    [fetchSetContest.fulfilled]: (state, action) => {
      state.contest.status = "loaded";
    },
    [fetchSetContest.rejected]: (state, action) => {
      state.contest.status = "error";
    },

  },
});

export const contestReducer = contestSlice.reducer;
