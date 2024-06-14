// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Acompanhamento from "./Acompanhamento";
import Registro from "./Registro";
import Home from "./Home"; // Importe o componente Home
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar">
        <h1 className="logo">Igreja Assembleia de Deus</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/registro">Registro de Culto</Link>
          </li>
          <li>
            <Link to="/acompanhamento">Acompanhamento</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/acompanhamento" element={<Acompanhamento />} />
      </Routes>
    </Router>
  );
};

export default App;
