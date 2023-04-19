import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchGetAllProjects = createAsyncThunk(
  "news/fetchGetAllProjects",
  async () => {
    const { data } = await axios.get("/api/project/all");
    return data;
  }
);

// export const fetchGetOneNews = createAsyncThunk(
//   "news/fetchGetOneNews",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/api/news/${id}`);
//       return response;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const fetchCreateProject = createAsyncThunk(
  "news/fetchCreateProject",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/project", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// export const fetchUpdateNews = createAsyncThunk(
//   "news/fetchUpdateNews",
//   async (params, { rejectWithValue }) => {
//     try {
//       console.log('id', params, 'params')
//       const response = await axios.patch(`/api/news/`, params);
//       return response.data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const fetchDeleteProject = createAsyncThunk(
  "news/fetchDeleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/project/${id}`);
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
  project: {
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

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetAllProjects.pending]: (state) => {
      state.project.items = [];
      state.project.status = "loading";
      state.project.error = "";
    },
    [fetchGetAllProjects.fulfilled]: (state, action) => {
      state.project.status = "loaded";
      state.project.items = action.payload;
    },
    [fetchGetAllProjects.rejected]: (state, action) => {
        state.project.items = [];
      state.project.status = "error";
      state.project.error = action.payload;
    },

    [fetchCreateProject.pending]: (state) => {
      state.status = "loading";
      state.project = null;
    },
    [fetchCreateProject.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.project = action.payload;
    },
    [fetchCreateProject.rejected]: (state) => {
      state.status = "error";
      state.project = null;
    },

    // [fetchUpdateNews.pending]: (state) => {
    //   state.news.status = "loading";
    //   state.news.error = "";
    // },
    // [fetchUpdateNews.fulfilled]: (state, action) => {
    //   state.news.status = "loaded";
    // },
    // [fetchUpdateNews.rejected]: (state, action) => {
    //   state.news.status = "error";
    // },


    // [fetchGetOneNews.pending]: (state) => {
    //   state.one.status = "loading";
    //   state.one.error = "";
    // },
    // [fetchGetOneNews.fulfilled]: (state, action) => {
    //   state.one.status = "loaded";
    //   state.one.items = action.payload;
    // },
    // [fetchGetOneNews.rejected]: (state, action) => {
    //   state.one.status = "error";
    //   state.one.error = action.payload;
    // },


    [fetchDeleteProject.pending]: (state, action) => {
        console.log(state.project.items)
        state.project.items = state.project.items.filter(
            (obj) => obj._id != action.meta.arg
        );
    },
    // [fetchDeleteProject.fulfilled]: (state, action) => {
    //     state.project.status = "loaded";
    //     state.project.items = action.payload;
    //   },
    [fetchDeleteProject.rejected]: (state, action) => {
        state.project.status = 'error'
        state.project.error = action.payload
    }
  },
});

export const projectReducer = projectSlice.reducer;
