import type { Meta, StoryObj } from '@storybook/react';
import { AppLink } from './AppLink';

const meta: Meta<typeof AppLink> = {
  title: 'shared/AppLink',
  component: AppLink,
  args: {
    to: '/',
    children: 'Link Text',
  },
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const Brand: Story = {
  args: {
    variant: 'brand',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Regular: Story = {
  args: {
    variant: 'regular',
  },
};

export const BgPrimary: Story = {
  args: {
    variant: 'bg-primary',
  },
};

export const Active: Story = {
  args: {
    to: '/',
    variant: 'brand',
  },
};
