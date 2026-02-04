import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'shared/Loader',
  component: Loader,
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Normal: Story = {};

export const StaticForScreenshot: Story = {
  decorators: [
    (Story) => (
      <div data-screenshot="true">
        <Story />
      </div>
    ),
  ],
};
