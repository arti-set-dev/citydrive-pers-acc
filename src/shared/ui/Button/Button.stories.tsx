import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'clear',
        'clear-brand',
        'close',
        'outline',
        'as-field',
      ],
    },
    offset: {
      control: 'radio',
      options: [0, 4, 8],
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Отправить',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Clear: Story = {
  args: {
    variant: 'clear',
    children: 'Clear Button',
  },
};

export const ClearBrand: Story = {
  args: {
    variant: 'clear-brand',
    children: 'Brand Style',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    icon: MockIcon,
    children: 'Next Step',
  },
};

export const Offset8: Story = {
  args: {
    variant: 'primary',
    offset: 8,
    children: 'Large Offset',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
};
