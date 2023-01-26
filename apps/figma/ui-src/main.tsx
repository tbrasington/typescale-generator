import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createMemoryRouter,
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Home } from "./Home";
import { Projects } from "./Projects";
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
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="project/:projectId" element={<Projects />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </React.StrictMode>
);
