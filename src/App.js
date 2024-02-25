import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Importa Route
import PrivateRoute from "./components/PrivateRoute";
import AuthForm from "./features/auth/AuthForm";
import { AddTarea } from "./features/tareas/AddTarea";
import { EditTarea } from "./features/tareas/EditTarea";
import { TareaList } from "./features/tareas/TareaList";
import { useSelector } from 'react-redux';

export default function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <AuthForm />
          </Route>
          <PrivateRoute path="/add-tarea" isLoggedIn={isLoggedIn} component={AddTarea} />
          <PrivateRoute path="/edit-tarea" isLoggedIn={isLoggedIn} component={EditTarea} />
          <PrivateRoute path="/list-tarea" isLoggedIn={isLoggedIn} component={TareaList} />
        </Switch>
      </div>
    </Router>
  );
}
