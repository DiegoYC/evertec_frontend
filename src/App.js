import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AuthForm from "./features/auth/AuthForm";

import { AddTarea } from "./features/tareas/AddTarea";
import { EditTarea } from "./features/tareas/EditTarea";
import { TareaList } from "./features/tareas/TareaList";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <AuthForm />
          </Route>
          <Route path="/add-tarea">
            <AddTarea />
          </Route>
          <Route path="/edit-tarea">
            <EditTarea />
          </Route>
          <Route path="/list-tarea">
            <TareaList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
