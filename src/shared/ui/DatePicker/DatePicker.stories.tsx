import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

const meta: Meta<typeof DatePicker> = {
  title: 'shared/DatePicker',
  component: DatePicker,
  argTypes: {
    onChange: { action: 'date changed' },
  },
  decorators: [
    (Story) => (
      <div
        data-screenshot="true"
        style={{ paddingBottom: '350px', maxWidth: '600px' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Empty: Story = {
  args: {
    fullWidth: false,
  },
};

export const WithValue: Story = {
  args: {
    value: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
  },
};

export const ErrorState: Story = {
  args: {
    error: 'Выберите корректный диапазон дат',
    value: {
      from: new Date(),
      to: undefined,
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [range, setRange] = useState<DateRange | undefined>(args.value);
    return <DatePicker {...args} value={range} onChange={setRange} />;
  },
  args: {
    fullWidth: true,
  },
};

export const DisabledBefore: Story = {
  args: {
    disabledBefore: addDays(new Date(), 30),
  },
};
