import React from "react";
import ReactDOM from "react-dom/client";
import {
  createMemoryRouter,
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Home, loader as projectsLoader } from "./views/Home/Home";
import { Projects } from "./views/Project/Projects";
import Root from "./Root";
import { data } from "../api/projects";
import { parseTokens } from "../parsers";

const typeData = parseTokens({
  styles: data.textStyles,
  tokens: data,
});

//console.log({ typeData });

const router = createMemoryRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",

    loader: projectsLoader,
    children: [
      { index: true, element: <Home /> },
      {
        path: "project/:projectId",
        element: <Projects />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />;
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <MemoryRouter>
//       <Routes>
//         <Route path="/" element={<Root />} id="root">
//           <Route index element={<Home />} />
//           <Route path="project/:projectId" element={<Projects />} />
//         </Route>
//       </Routes>
//     </MemoryRouter>
//   </React.StrictMode>
// );
