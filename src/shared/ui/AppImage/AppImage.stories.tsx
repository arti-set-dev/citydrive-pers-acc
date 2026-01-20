import type { Meta, StoryObj } from '@storybook/react';
import { AppImage } from './AppImage';

const meta: Meta<typeof AppImage> = {
  title: 'shared/AppImage',
  component: AppImage,
};

export default meta;
type Story = StoryObj<typeof AppImage>;

export const Primary: Story = {
  args: {
    alt: 'Описание изображения',
    height: '200px',
    width: '200px',
    src: '/404.png',
  },
};
