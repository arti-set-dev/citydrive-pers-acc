import { screen, fireEvent } from '@testing-library/react';
import { ActionPopover } from './Popover';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';

describe('ActionPopover', () => {
  test('рендерит кнопку открытия, но не рендерит панель по умолчанию', () => {
    render(
      <ActionPopover>
        <button>Action 1</button>
      </ActionPopover>,
    );

    expect(screen.getByTestId('popover-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('popover-panel')).not.toBeInTheDocument();
  });

  test('открывает панель с контентом при клике на кнопку', async () => {
    render(
      <ActionPopover>
        <div data-testid="popover-content">Меню действий</div>
      </ActionPopover>,
    );

    const button = screen.getByTestId('popover-btn');
    fireEvent.click(button);

    const panel = await screen.findByTestId('popover-panel');
    expect(panel).toBeInTheDocument();
    expect(screen.getByTestId('popover-content')).toHaveTextContent(
      'Меню действий',
    );
  });

  test('закрывает панель при повторном клике на кнопку', async () => {
    render(
      <ActionPopover>
        <div>Content</div>
      </ActionPopover>,
    );

    const button = screen.getByTestId('popover-btn');

    fireEvent.click(button);
    expect(await screen.findByTestId('popover-panel')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByTestId('popover-panel')).not.toBeInTheDocument();
  });
});
