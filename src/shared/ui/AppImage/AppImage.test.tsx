import { render, screen } from '@/shared/utils/jest/providers/JestProvider';
import { AppImage } from './AppImage';

describe('AppImage', () => {
  const defaultProps = {
    src: 'test-image.png',
    alt: 'Пример изображения',
    width: '100px',
    height: '100px',
  };

  test('компонент успешно отображается в DOM', () => {
    render(<AppImage {...defaultProps} />);

    // 1. Находим элемент по alt-тексту
    const image = screen.getByAltText(defaultProps.alt);

    // 2. Проверяем наличие в документе
    expect(image).toBeInTheDocument();
  });

  test('имеет корректные атрибуты src и размеры', () => {
    render(<AppImage {...defaultProps} />);

    const image = screen.getByAltText(defaultProps.alt) as HTMLImageElement;

    // Проверяем src (учитывая, что jest-dom может добавлять префикс пути)
    expect(image.src).toContain(defaultProps.src);

    // Проверяем атрибуты ширины и высоты
    expect(image).toHaveAttribute('width', '100px');
    expect(image).toHaveAttribute('height', '100px');
  });

  test('применяет CSS класс из модулей', () => {
    render(<AppImage {...defaultProps} />);

    const image = screen.getByAltText(defaultProps.alt);

    // identity-obj-proxy вернет 'Img', если в scss это .Img
    expect(image).toHaveClass('Img');
  });
});
