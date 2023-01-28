export type ProjectProps = {
  id: string;
  style_count: number;
  name: string;
  description: string;
  tokens: unknown;
};

const data = {
  "typography-scale": {
    $type: "scale",
    $value: {
      min: {
        width: "320px",
        base: "16px",
        ratio: 1.067,
      },
      max: {
        width: "1728px",
        base: "21px",
        ratio: 1.414,
      },
    },
  },
  font: {
    family: {
      heading: {
        $value: "Suisse Int'l Trial",
        $type: "fontFamily",
      },
      body: {
        $value: "Georgia",
        $type: "fontFamily",
      },
    },
    weight: {
      heading: {
        normal: {
          $value: 400,
          $type: "fontWeight",
        },
        bold: {
          $value: 700,
          $type: "fontWeight",
        },
      },
      body: {
        normal: {
          $value: 400,
          $type: "fontWeight",
        },
        bold: {
          $value: 700,
          $type: "fontWeight",
        },
      },
    },
    lineHeight: {
      heading: {
        $value: 1.2,
        $type: "lineHeight",
      },
      body: {
        $value: 1.4,
        $type: "lineHeight",
      },
    },
  },
  textStyles: {
    "Heading 1": {
      $type: "typography",
      $value: {
        fontFamily: "{font.family.heading}",
        fontWeight: "{font.weight.heading.normal}",
        letterSpacing: "0px",
        lineHeight: "{font.lineHeight.heading}",
        fontSize: "{{scales.typography-step-4}}",
      },
    },
  },
};

const projectData = [
  {
    id: "1",
    name: "tbrasington.com",
    description: "Project 1 description",
    style_count: 10,
    tokens: data,
  },
  {
    id: "2",
    name: "thepostchaise.com",
    description: "Project 1 description",
    style_count: 10,
    tokens: data,
  },
];

export function getProjects(): ProjectProps[] {
  return projectData;
}

export function getProject(id: string) {
  return projectData.find((project) => project.id === id);
}

export async function getProjects2(): Promise<ProjectProps[]> {
  return projectData;
}
