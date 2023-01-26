import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../api/projects";

export function Projects() {
  let params = useParams();
  const { projectId } = params;
  let id = projectId;
  if (!id) return <main>Project not found</main>;
  const project = getProject(id);
  if (!project) return <main>Project not found</main>;
  console.log({ params });
  return <main>I am project {project.name}</main>;
}
