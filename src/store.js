import { configureStore } from "@reduxjs/toolkit";
import tareasReducer from "./features/tareas/tareasSlice";
import authReducer from './features/auth/authSlice'; // Importa el slice de autenticación

export default configureStore({
  reducer: {
    auth: authReducer,
    tareas: tareasReducer,
  },
});