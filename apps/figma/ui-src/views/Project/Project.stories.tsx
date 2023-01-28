import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Projects as Component } from "./index";

export default {
  title: "Projects",
  component: Component,
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Projects: Story = {
  args: {},
  render(args) {
    return <Component></Component>;
  },
};
