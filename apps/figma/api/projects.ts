import { ViewPortProps } from "@initiate-ui/typescale-generator";

export type ProjectProps = {
  id: string;
  style_count: number;
  name: string;
  description: string;
  tokens: TokensProps;
};

export interface FontValueProps {
  [key: string]: string | number | undefined;
  name?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  fontSize?: number | string;
  fontStyle?: string;
  textDecoration?: string;
  textTransform?: string;
}

export type TextStylesProps = {
  [key: string]: {
    [x: string]: any;
    $type: string;
    $value: FontValueProps;
    $permutations?: PermutationProps[];
  };
};

export interface TypographyScaleProps {
  width: string;
  base: string;
  ratio: number;
}
export interface TokensProps {
  font: Font;
  textStyles: TextStylesProps;
  typographyScale: {
    $type: string;
    $value: ViewPortProps[];
  };
}
export interface Font {
  family?: TokenProps;
  weight?: TokenProps;
  lineHeight?: TokenProps;
}

export interface PermutationProps {
  $name?: string;
  $type: string;
  $value: TokenValueProps[];
}
export interface TokenProps {
  [key: string]: TokenValueProps | TokenProps;
}

export type TokenValueProps = {
  $name?: string;
  $value: string | number;
  $type: string;
};

const permutationsForBodyFontWeight = {
  $name: "Weight",
  $type: "permutation",
  $value: [
    {
      $name: "Normal",
      $type: "fontWeight",
      $value: "{font.weight.body.normal}",
    },
    {
      $name: "Bold",
      $type: "fontWeight",
      $value: "{font.weight.body.bold}",
    },
  ],
};
const permutationsForBodyFontSize = {
  $name: "Sizes",
  $type: "permutation",
  $value: [
    {
      $name: "Large",
      $type: "fontSize",
      $value: "{scales.step-1}",
    },
    {
      $name: "Base",
      $type: "fontSize",
      $value: "{scales.step-0}",
    },
    {
      $name: "Small",
      $type: "fontSize",
      $value: "{scales.step--1}",
    },
  ],
};
const permutationsForBodyDecorations = {
  $name: "Decorations",
  $type: "permutation",
  $value: [
    {
      $name: "None",
      $type: "textDecoration",
      $value: "none",
    },
    {
      $name: "Underline",
      $type: "textDecoration",
      $value: "underline",
    },
    {
      $name: "Strikethrough",
      $type: "textDecoration",
      $value: "line-through",
    },
  ],
};

// stub state
export const data: TokensProps = {
  typographyScale: {
    $type: "scale",
    $value: [
      {
        $name: "BP1",
        width: 320,
        fontSize: 16,
        typeScale: 1.067,
      },
      {
        $name: "BP4",
        width: 1728,
        fontSize: 21,
        typeScale: 1.414,
      },
    ],
  },
  font: {
    family: {
      heading: {
        $value: "SuisseIntlTrial",
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
        fontStyle: "normal",
        letterSpacing: "0px",
        lineHeight: "{font.lineHeight.heading}",
        fontSize: "{scales.step-4}",
      },
    },
    Paragraph: {
      $type: "typography",
      $value: {
        fontFamily: "{font.family.body}",
        fontWeight: "{font.weight.body.normal}",
        fontStyle: "normal",
        letterSpacing: "0px",
        lineHeight: "{font.lineHeight.body}",
        fontSize: "{scales.step-0}",
      },
      $permutations: [
        permutationsForBodyFontSize,
        permutationsForBodyFontWeight,
        permutationsForBodyDecorations,
      ],
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
