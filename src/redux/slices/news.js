import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchGetAllNews = createAsyncThunk(
  "news/fetchGetAllNews",
  async () => {
    const { data } = await axios.get("/api/news/all");
    return data;
  }
);

export const fetchGetOneNews = createAsyncThunk(
  "news/fetchGetOneNews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/news/${id}`);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreateNews = createAsyncThunk(
  "news/fetchCreateNews",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/news", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUpdateNews = createAsyncThunk(
  "news/fetchUpdateNews",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/news", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDeleteNews = createAsyncThunk(
  "news/fetchDeleteNews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/news/${id}`);
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
  news: {
    items: [],
    status: "loading",
    error: "",
  },
  one: {
    items: [],
    status: "loading",
    error: "",
  }

};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetAllNews.pending]: (state) => {
      state.news.items = [];
      state.news.status = "loading";
      state.news.error = "";
    },
    [fetchGetAllNews.fulfilled]: (state, action) => {
      state.news.status = "loaded";
      state.news.items = action.payload;
    },
    [fetchGetAllNews.rejected]: (state, action) => {
        state.news.items = [];
      state.news.status = "error";
      state.news.error = action.payload;
    },

    [fetchCreateNews.pending]: (state) => {
      state.status = "loading";
      state.news = null;
    },
    [fetchCreateNews.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.news = action.payload;
    },
    [fetchCreateNews.rejected]: (state) => {
      state.status = "error";
      state.news = null;
    },

    [fetchUpdateNews.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [fetchUpdateNews.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.news = action.payload;
    },
    [fetchUpdateNews.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },


    [fetchGetOneNews.pending]: (state) => {
      state.one.status = "loading";
      state.one.error = "";
    },
    [fetchGetOneNews.fulfilled]: (state, action) => {
      state.one.status = "loaded";
      state.one.items = action.payload;
    },
    [fetchGetOneNews.rejected]: (state, action) => {
      state.one.status = "error";
      state.one.error = action.payload;
    },


    [fetchDeleteNews.pending]: (state, action) => {
        console.log(state.news.items)
        state.news.items = state.news.items.filter(
            (obj) => obj._id != action.meta.arg
        );
    },
    [fetchGetOneNews.fulfilled]: (state, action) => {
        state.news.status = "loaded";
        state.news.items = action.payload;
      },
    [fetchDeleteNews.rejected]: (state, action) => {
        state.news.status = 'error'
        state.news.error = action.payload
    }
  },
});

export const newsReducer = newsSlice.reducer;
