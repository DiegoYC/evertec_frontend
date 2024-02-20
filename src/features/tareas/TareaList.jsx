import { fetchTareas, deleteTarea } from "./tareasSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function TareaList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.tareas);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(deleteTarea({ id }));
  };

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
              {entities.length &&
                entities.map(({ id, descripcion, fechaCreacion, fechaModificacion, vigente}, i) => (
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