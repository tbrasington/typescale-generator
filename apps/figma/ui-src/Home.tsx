import React from "react";

import { Button, Main, ToolBar } from "./styles/App";
import Text from "./styles/Text";
import { getProjects } from "../api/projects";
import { Link } from "react-router-dom";

export function Home({}) {
  const projects = getProjects();

  return (
    <Main>
      <ToolBar>
        <Text color="highlight">Projects</Text>
        <Button>New Project</Button>
      </ToolBar>
      <div>
        {projects && projects.length > 0 ? (
          projects.map((item) => {
            return (
              <p key={item.id}>
                <Link to={`project/${item.id}`}>{item.name}</Link>
              </p>
            );
          })
        ) : (
          <Text>No projects found</Text>
        )}
      </div>
    </Main>
  );
}
