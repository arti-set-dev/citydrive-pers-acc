import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';
import { PATHS } from '@citydrive/shared/lib/router/paths';

const meta: Meta<typeof Logo> = {
  title: 'shared/Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <div data-screenshot="true">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  parameters: {
    router: {
      initialEntries: ['/some-random-page'],
    },
  },
};

export const OnHomePage: Story = {
  parameters: {
    router: {
      initialEntries: [PATHS.home],
    },
  },
};

export const WithCompanyOnAuth: Story = {
  args: {
    companyName: 'CityDrive Corp',
  },
  parameters: {
    router: {
      initialEntries: [PATHS.auth],
    },
  },
};
