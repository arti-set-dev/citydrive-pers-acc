import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

const meta: Meta<typeof Modal> = {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    onClose: { action: 'closed' },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        data-screenshot="true"
        style={{ height: '400px', transform: 'scale(1)' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Opened: Story = {
  args: {
    isOpen: true,
    children: (
      <div>
        <Text as="h2">Заголовок модалки</Text>
        <Text>
          Произвольный контент модального окна. Здесь может быть форма или
          уведомление.
        </Text>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Открыть модалку</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <Text as="h2">Подтвердите действие</Text>
            <Text>Вы уверены, что хотите продолжить оформление?</Text>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsOpen(false)}>Ок</Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};
