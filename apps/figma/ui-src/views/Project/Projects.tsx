import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { getProject, ProjectProps } from "../../../api/projects";
import { Button, Main, ToolBar } from "../../styles/App";
import Text from "../../styles/Text";
import * as styles from "./Project.styles";
import { parseTokens } from "../../../parsers";
export function Projects() {
  let params = useParams();
  const { projectId } = params;
  let id = projectId;
  if (!id) return <NotFound />;
  const project = getProject(id);
  if (!project) return <NotFound />;

  return <View project={project} />;
}

export function View({ project }: { project: ProjectProps }) {
  const typeData = parseTokens({
    styles: project.tokens.textStyles,
    tokens: project.tokens,
  });
  console.log({ typeData });
  return (
    <Main>
      <ToolBar>
        <Text color="highlight">{project.name}</Text>
        <Button>Sync</Button>
      </ToolBar>
      <styles.container>
        <styles.list>
          {typeData.map((item) => {
            return (
              <styles.item key={item.name}>
                <span
                  style={{
                    fontFamily: `${item.fontFamily}`,
                    fontWeight: `${item.fontWeight}`,
                    fontStyle: `${item.fontStyle}`,
                    fontSize: 24,
                  }}
                >
                  A quick dog jumps over a lazy foxes
                </span>
                <styles.itemLabelValue>
                  <Text size="minor">Font Family</Text>
                  <Text color="link">{item.fontFamily}</Text>
                </styles.itemLabelValue>
              </styles.item>
            );
          })}
        </styles.list>
      </styles.container>
    </Main>
  );
}

export function NotFound() {
  return (
    <Main>
      <ToolBar>
        <Text color="highlight">Projects</Text>
      </ToolBar>
      <styles.container>
        <Text>Couldn't find that project</Text>
      </styles.container>
    </Main>
  );
}
