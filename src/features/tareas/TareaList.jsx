import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { fetchTareas, deleteTarea } from "./tareasSlice";
import { logout } from '../../features/auth/authSlice';

export function TareaList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.tareas);
  const loading = useSelector((state) => state.loading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  useEffect(() => {
    dispatch(fetchTareas());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTarea({ id }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Redux CRUD Tareas</h1>
      </div>
      <div className="row">
        <div className="two columns">

        </div>
        <div className="two columns">
          <Link to="/add-tarea">
            <button className="button-primary">Agregar Tarea</button>
          </Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tarea</th>
                <th>Creación</th>
                <th>Actualización</th>
                <th>Activo</th>
              </tr>
            </thead>
            <tbody>
              {entities.map(({ id, descripcion, fechaCreacion, fechaModificacion, vigente}, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{descripcion}</td>
                    <td>{fechaCreacion}</td>
                    <td>{fechaModificacion}</td>
                    <td><input type="checkbox" checked={vigente} disabled="disabled"/></td>
                    <td>
                      <button onClick={() => handleDelete(id)}>Eliminar</button>
                      <Link to={`/edit-tarea/${id}`}>
                        <button>Editar</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}