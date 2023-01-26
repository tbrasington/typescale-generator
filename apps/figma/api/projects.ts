export type ProjectProps = {
  id: string;
  style_count: number;
  name: string;
  description: string;
};

export function getProjects(): ProjectProps[] {
  return [
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
}
