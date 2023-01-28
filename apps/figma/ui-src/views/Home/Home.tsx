import React from "react";

import { Button, Main, ToolBar } from "../../styles/App";
import Text from "../../styles/Text";
import { getProjects } from "../../../api/projects";
import { Link } from "react-router-dom";
import * as styles from "./Home.styles";
export function Home({}) {
  const projects = getProjects();

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
