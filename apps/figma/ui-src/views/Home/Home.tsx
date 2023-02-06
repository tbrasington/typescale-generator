import React from "react";

import { Button, Main, ToolBar } from "../../styles/App";
import Text from "../../styles/Text";
import {
  data,
  FontValueProps,
  getProjects,
  getProjects2,
  ProjectProps,
} from "../../../api/projects";
import {
  json,
  Link,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import * as styles from "./Home.styles";
import { parseTokens } from "../../../parsers";
import { fontsToLoadInFigma } from "../../../parsers/fontLoader";
export async function loader() {
  const projects = await getProjects2();
  return json({ projects });
}

export function Home({}) {
  //const projects = getProjects();
  const typeData = parseTokens({
    styles: data.textStyles,
    tokens: data,
  });

  // load in the fonts and deduplicate them
  const fontsToLoad = fontsToLoadInFigma(typeData).filter(
    (tag, index, array) =>
      array.findIndex((t) => t.family == tag.family && t.style == tag.style) ==
      index
  );
  const { projects } = useRouteLoaderData("root") as {
    projects: ProjectProps[];
  };
  //console.log({ projects2 });

  const syncStyles = () => {
    console.log({ typeData });

    parent.postMessage(
      { pluginMessage: { type: "sync-styles", typeData, fontsToLoad } },
      "*"
    );
  };

  return (
    <Main>
      <ToolBar>
        <Text color="highlight">Projects</Text>
        <Button onClick={syncStyles}>New Project</Button>
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
