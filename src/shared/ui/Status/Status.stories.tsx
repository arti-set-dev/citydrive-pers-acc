import type { Meta, StoryObj } from '@storybook/react';
import { Status } from './Status';
import { HStack } from '../Stack';
import { Text } from '../Text/Text';

const meta: Meta<typeof Status> = {
  title: 'shared/Status',
  component: Status,
  argTypes: {
    status: {
      control: 'radio',
      options: ['active', 'inactive'],
    },
  },
  decorators: [
    (Story, context) => (
      <div data-screenshot="true">
        <HStack gap={8} align="center">
          <Story />
          <Text>
            {context.args.status === 'active'
              ? 'Пользователь в сети'
              : 'Оффлайн'}
          </Text>
        </HStack>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Active: Story = {
  args: {
    status: 'active',
  },
};

export const Inactive: Story = {
  args: {
    status: 'inactive',
  },
};

export const ListExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <HStack gap={8}>
        <Status status="active" />
        <Text>Администратор</Text>
      </HStack>
      <HStack gap={8}>
        <Status status="inactive" />
        <Text>Модератор</Text>
      </HStack>
    </div>
  ),
  decorators: [],
};
