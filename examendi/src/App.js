import React from 'react';
import Ejercicio1 from './components/Ejercicio1';
import Ejercicio2 from './components/Ejercicio2';
import Ejercicio3 from './components/Ejercicio3';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { PaginasApp } from './data/PaginasApp';


function App() {
  return (
    <Router>

      <Menu />

      <h1>Desarrollo de Interfaces: Examen React.js</h1>
      <p>
        Resuelve los ejercicios propuestos. Para ello, haz un fork de este repositorio desde tu
        cuenta de Github y sube un enlace a la tarea de examen. El repositorio debe
        tener el nombre examen-react-Nombre-Apellido1, donde nombre y apellido
        son los tuyos.
      </p>

      {PaginasApp.map((item) => {
        return (
          <Route
            key={item.id}
            path={item.path}
            exact
            component={item.component}
          />
        );
      })}
    </Router>

  );
}

export default App;
