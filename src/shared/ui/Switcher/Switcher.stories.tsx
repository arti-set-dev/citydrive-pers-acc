import type { Meta, StoryObj } from '@storybook/react';
import { Switcher } from './Switcher';
import { useState } from 'react';
import { HStack } from '../Stack';
import { Text } from '../Text/Text';

const meta: Meta<typeof Switcher> = {
  title: 'shared/Switcher',
  component: Switcher,
  argTypes: {
    onChange: { action: 'changed' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switcher>;

export const Off: Story = {
  args: {
    checked: false,
  },
};

export const On: Story = {
  args: {
    checked: true,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [enabled, setEnabled] = useState(false);

    return (
      <HStack gap={16}>
        <Switcher {...args} checked={enabled} onChange={setEnabled} />
        <Text>{enabled ? 'Опция включена' : 'Опция выключена'}</Text>
      </HStack>
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultChecked: true,
  },
};
