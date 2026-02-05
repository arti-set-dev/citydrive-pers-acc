import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './TimePicker';
import { useState } from 'react';

const meta: Meta<typeof TimePicker> = {
  title: 'shared/TimePicker',
  component: TimePicker,
  argTypes: {
    onChange: { action: 'time changed' },
  },
  decorators: [
    (Story) => (
      <div
        data-screenshot="true"
        style={{ maxWidth: '400px', minHeight: '350px' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Empty: Story = {
  args: {
    value: { start: '', end: '' },
  },
};

export const Filled: Story = {
  args: {
    value: { start: '09:00', end: '18:30' },
  },
};

export const WithError: Story = {
  args: {
    value: { start: '12:00', end: '' },
    error: 'Укажите время окончания',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [val, setVal] = useState({ start: '', end: '' });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TimePicker {...args} value={val} onChange={setVal} />
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Выбрано: {val.start || '...'} — {val.end || '...'}
        </div>
      </div>
    );
  },
};
