import { screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';

describe('Modal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  test('не рендерится в DOM, если isOpen={false}', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div>Контент модалки</div>
      </Modal>,
    );

    expect(screen.queryByText('Контент модалки')).not.toBeInTheDocument();
  });

  test('рендерится с контентом, если isOpen={true}', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="test-content">Контент модалки</div>
      </Modal>,
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  test('вызывает onClose при клике по оверлею', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Контент</div>
      </Modal>,
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('вызывает onClose при клике на кнопку закрытия', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Контент</div>
      </Modal>,
    );

    const closeBtn = screen.getByTestId('modal-close-btn');
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('НЕ вызывает onClose при клике на само содержимое (stopPropagation)', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="inner-content">Внутренний контент</div>
      </Modal>,
    );

    const content = screen.getByTestId('inner-content');
    fireEvent.click(content);

    expect(onClose).not.toHaveBeenCalled();
  });
});
