import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Example/Header',
  component: Logo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const LoggedIn: Story = {
  args: {
   
  },
}; 