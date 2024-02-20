import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTareas = createAsyncThunk("tareas/fetchTareas", async () => {
  const response = await fetch("http://localhost:8080/api/v1/tareas/");
  const tareas = await response.json();
  console.log(tareas);
  return tareas;
});

export const postTarea = createAsyncThunk("tareas/postTarea", async (tarea, { dispatch }) => {
  const response = await fetch("http://localhost:8080/api/v1/tareas/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarea),
  });
  await response.json();
  dispatch(fetchTareas());
});

export const updateTarea = createAsyncThunk("tareas/updateTarea", async (tarea, { dispatch }) => {
  const response = await fetch(`http://localhost:8080/api/v1/tareas/${tarea.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarea),
  });
  await response.json();
  dispatch(fetchTareas());
});

export const deleteTarea = createAsyncThunk("tareas/deleteTarea", async (id, { dispatch }) => {
  await fetch(`http://localhost:8080/api/v1/tareas/${id.id}`, {
    method: "DELETE",
  });
  dispatch(fetchTareas());
});

const tareasSlice = createSlice({
  name: "tareas",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    tareaUpdated(state, action) {
      const { id, descripcion, fechaModificacion, vigente } = action.payload;
      const existingTarea = state.entities.find((tarea) => tarea.id === id);
      if (existingTarea) {
        existingTarea.descripcion = descripcion;
        existingTarea.fechaModificacion = fechaModificacion;
        existingTarea.vigente = vigente;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTareas.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTareas.fulfilled, (state, action) => {
        state.entities = [];
        state.loading = false;
        state.entities = [...state.entities, ...action.payload];
      })
      .addCase(fetchTareas.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(postTarea.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postTarea.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Tarea creada exitosamente:", action.payload);
      })
      .addCase(postTarea.rejected, (state, action) => {
        state.loading = false;
        console.error("Error al crear tarea:", action.error.message);
      })
      .addCase(deleteTarea.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTarea.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Tarea eliminada exitosamente");
      })
      .addCase(deleteTarea.rejected, (state, action) => {
        state.loading = false;
        console.error("Error al eliminar tarea:", action.error.message);
      }).addCase(updateTarea.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTarea.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Tarea actualizada exitosamente:", action.payload);
      })
      .addCase(updateTarea.rejected, (state, action) => {
        state.loading = false;
        console.error("Error al actualizar tarea:", action.error.message);
      });
  },
});

export const { tareaUpdated } = tareasSlice.actions;

export default tareasSlice.reducer;
