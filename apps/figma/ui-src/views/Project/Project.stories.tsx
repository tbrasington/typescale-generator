import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { projectData } from "../../../api/projects";
import { View, NotFound } from "./index";

export default {
  title: "Projects",
  component: View,
} as Meta<typeof View>;

type Story = StoryObj<typeof View>;

export const Projects: Story = {
  args: { project: projectData[0] },
  render(args) {
    return <View {...args} />;
  },
};

export const NotFoundProject: Story = {
  render() {
    return <NotFound />;
  },
};
