import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchGetAllMonitorings = createAsyncThunk(
  "monitoring/fetchGetAllMonitorings",
  async () => {
    const { data } = await axios.get("/api/monitoring/all");
    return data;
  }
);

export const fetchCreateMonitoring = createAsyncThunk(
  "monitoring/fetchCreateMonitoring",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/monitoring", params);
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

export const fetchDeleteMonitoring = createAsyncThunk(
  "monitoring/fetchDeleteMonitoring",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/monitoring/${id}`);
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
  monitoring: {
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

const monitoringSlice = createSlice({
  name: "monitoring",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetAllMonitorings.pending]: (state) => {
      state.monitoring.items = [];
      state.monitoring.status = "loading";
      state.monitoring.error = "";
    },
    [fetchGetAllMonitorings.fulfilled]: (state, action) => {
      state.monitoring.status = "loaded";
      state.monitoring.items = action.payload;
    },
    [fetchGetAllMonitorings.rejected]: (state, action) => {
        state.monitoring.items = [];
      state.monitoring.status = "error";
      state.monitoring.error = action.payload;
    },

    [fetchCreateMonitoring.pending]: (state) => {
      state.status = "loading";
      state.monitoring = null;
    },
    [fetchCreateMonitoring.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.monitoring = action.payload;
    },
    [fetchCreateMonitoring.rejected]: (state) => {
      state.status = "error";
      state.monitoring = null;
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


    [fetchDeleteMonitoring.pending]: (state, action) => {
        console.log(state.monitoring.items)
        state.monitoring.items = state.monitoring.items.filter(
            (obj) => obj._id != action.meta.arg
        );
    },

    [fetchDeleteMonitoring.rejected]: (state, action) => {
        state.monitoring.status = 'error'
        state.monitoring.error = action.payload
    }
  },
});

export const monitoringReducer = monitoringSlice.reducer;
