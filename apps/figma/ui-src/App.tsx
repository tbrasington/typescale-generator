import React, { useRef } from "react";
import { MemoryRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
import { Projects } from "./Projects";

function App() {
  

  return (
   <MemoryRouter>
        <Routes>
          <Route path="/"  element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
          </Route>
        </Routes>
      </MemoryRouter>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default App;
