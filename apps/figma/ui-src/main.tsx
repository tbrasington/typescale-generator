import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Projects } from "./views/Project/Projects";
import Root from "./Root";

// const router = createMemoryRouter([
//   {
//     path: "/",
//     element: <Root />,
//     id: "root",
//     children: [
//       { index: true, element: <Home /> },
//       {
//         path: "project/:projectId",
//         element: <Projects />,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Root />} id="root">
          <Route index element={<Home />} />
          <Route path="project/:projectId" element={<Projects />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </React.StrictMode>
);
