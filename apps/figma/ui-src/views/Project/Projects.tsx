import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../../api/projects";
import { Button, Main, ToolBar } from "../../styles/App";
import Text from "../../styles/Text";
import * as styles from "./Project.styles";

export function Projects() {
  let params = useParams();
  const { projectId } = params;
  let id = projectId;
  if (!id) return <Main>Project not found</Main>;
  const project = getProject(id);
  if (!project) return <Main>Project not found</Main>;
  console.log({ params });
  return (
    <Main>
      <ToolBar>
        <Text color="highlight">{project.name}</Text>
        <Button>Sync</Button>
      </ToolBar>
      <styles.container>
        <styles.list>
          <styles.item>
            <span>A quick dog jumps over a lazy foxes</span>
          </styles.item>
        </styles.list>
      </styles.container>
    </Main>
  );
}
