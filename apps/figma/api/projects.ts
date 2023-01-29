export type ProjectProps = {
  id: string;
  style_count: number;
  name: string;
  description: string;
  tokens: TokensProps;
};

export interface FontValueProps {
  name?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  fontSize?: number | string | null;
  fontStyle?: string;
}

export type TextStylesProps = {
  [key: string]: {
    $type: string;
    $value: FontValueProps;
  };
};

export interface TokensProps {
  font: Font;
  textStyles: TextStylesProps;
  typographyScale: {
    $type: string;
    $value: {
      min: {
        width: string;
        base: string;
        ratio: number;
      };
      max: {
        width: string;
        base: string;
        ratio: number;
      };
    };
  };
}
export interface Font {
  family?: TokenProps;
  weight?: TokenProps;
  lineHeight?: TokenProps;
}

export interface TokenProps {
  [key: string]: TokenValueProps | TokenProps;
}

type TokenValueProps = {
  $value: string | number;
  $type: string;
};

// stub state
export const data: TokensProps = {
  typographyScale: {
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
    Paragraph: {
      $type: "typography",
      $value: {
        fontFamily: "{font.family.body}",
        fontWeight: "{font.weight.body.normal}",
        letterSpacing: "0px",
        lineHeight: "{font.lineHeight.body}",
        fontSize: "{{scales.typography-step-0}}",
      },
    },
  },
};

export const projectData: ProjectProps[] = [
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
