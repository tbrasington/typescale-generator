import React from "react";

import { Button, Main, ToolBar } from "./styles/App";
import Text from "./styles/Text";
import { getProjects, ProjectProps } from "../api/projects";
import { useLoaderData, json } from "react-router-dom";

export async function loader() {
  const projects = await getProjects();
  return json({ projects });
}

export function Home({}) {
  const { projects } = useLoaderData() as { projects: ProjectProps[] };

  return (
    <Main>
      <ToolBar>
        <Text color="highlight">Projects</Text>
        <Button>New Project</Button>
      </ToolBar>
      <div>
        {projects && projects.length > 0 ? (
          projects.map((item) => {
            return item.name;
          })
        ) : (
          <Text>No projects found</Text>
        )}
      </div>
    </Main>
  );
}
