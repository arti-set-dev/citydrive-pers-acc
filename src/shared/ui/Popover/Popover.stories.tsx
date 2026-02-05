import type { Meta, StoryObj } from '@storybook/react';
import { ActionPopover } from './Popover';
import { Button } from '../Button/Button';
import { VStack } from '../Stack';
import { useEffect, useRef } from 'react';

const meta: Meta<typeof ActionPopover> = {
  title: 'shared/ActionPopover',
  component: ActionPopover,
  decorators: [
    (Story) => (
      <div
        data-screenshot="true"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '250px',
          width: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActionPopover>;

export const Default: Story = {
  args: {
    children: (
      <VStack
        gap={4}
        align="start"
        style={{ padding: '8px', minWidth: '150px' }}
      >
        <Button
          variant="clear"
          style={{ width: '100%', justifyContent: 'start' }}
        >
          Редактировать
        </Button>
        <Button
          variant="clear"
          style={{ width: '100%', justifyContent: 'start' }}
        >
          Копировать
        </Button>
        <Button
          variant="clear"
          style={{
            width: '100%',
            justifyContent: 'start',
            color: 'var(--danger-color)',
          }}
        >
          Удалить
        </Button>
      </VStack>
    ),
  },
};

export const CustomContent: Story = {
  args: {
    children: (
      <div style={{ padding: '12px', maxWidth: '200px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>
          Дополнительная информация о выбранном объекте.
        </p>
      </div>
    ),
  },
};

export const IsOpened: Story = {
  render: (args) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const trigger = containerRef.current?.querySelector('button');
      trigger?.click();
    }, []);

    return (
      <div ref={containerRef}>
        <ActionPopover {...args} />
      </div>
    );
  },
  args: {
    children: 'is Opened',
  },
};
