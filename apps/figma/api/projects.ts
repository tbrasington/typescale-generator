export type ProjectProps = {
  id: string;
  style_count: number;
  name: string;
  description: string;
};

const projectData = [
  {
    id: "1",
    name: "tbrasington.com",
    description: "Project 1 description",
    style_count: 10,
  },
  {
    id: "2",
    name: "thepostchaise.com",
    description: "Project 1 description",
    style_count: 10,
  },
];

export function getProjects(): ProjectProps[] {
  return projectData;
}

export function getProject(id: string) {
  return projectData.find((project) => project.id === id);
}
