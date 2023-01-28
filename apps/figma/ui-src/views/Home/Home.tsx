import React from "react";

import { Button, Main, ToolBar } from "../../styles/App";
import Text from "../../styles/Text";
import { getProjects, getProjects2, ProjectProps } from "../../../api/projects";
import {
  json,
  Link,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import * as styles from "./Home.styles";

export async function loader() {
  const projects = await getProjects2();
  return json({ projects });
}

export function Home({}) {
  //const projects = getProjects();
  const { projects } = useRouteLoaderData("root") as {
    projects: ProjectProps[];
  };
  //console.log({ projects2 });
  return (
    <Main>
      <ToolBar>
        <Text color="highlight">Projects</Text>
        <Button>New Project</Button>
      </ToolBar>
      <styles.list>
        {projects && projects.length > 0 ? (
          projects.map((item) => {
            return (
              <styles.item key={item.id}>
                <Text weight="body" color="base" underlineLinks={false}>
                  <Link to={`project/${item.id}`}>{item.name}</Link>
                </Text>
                <Text>{item.style_count}</Text>
              </styles.item>
            );
          })
        ) : (
          <Text>No projects found</Text>
        )}
      </styles.list>
    </Main>
  );
}

//const container =
