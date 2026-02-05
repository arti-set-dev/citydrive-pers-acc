import { screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { $api } from '@/shared/api/interceptors';
import { render } from '@/shared/utils/jest/providers/JestProvider';

jest.mock('@/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as jest.MockedFunction<typeof $api>;

describe('LoginForm with data-testid', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should find all elements by data-testid', () => {
    render(<LoginForm />);

    expect(screen.getByTestId('LoginForm')).toBeInTheDocument();
    expect(screen.getByTestId('LoginForm.Email')).toBeInTheDocument();
    expect(screen.getByTestId('LoginForm.Password')).toBeInTheDocument();
    expect(screen.getByTestId('LoginForm.Submit')).toBeInTheDocument();
  });

  test('successful interaction flow', async () => {
    const mockUserData = { id: '777', name: 'Roman', token: 'jwt_token' };
    mockedApi.mockResolvedValue({ data: mockUserData, headers: {} });

    render(<LoginForm />);

    const emailInput = screen.getByTestId('LoginForm.Email');
    const passwordInput = screen.getByTestId('LoginForm.Password');
    const submitBtn = screen.getByTestId('LoginForm.Submit');

    fireEvent.change(emailInput, { target: { value: 'admin@citydrive.ru' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitBtn);

    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent('Загрузка...');

    await waitFor(() => {
      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: 'admin@citydrive.ru',
            password: 'password123',
          }),
        }),
      );

      expect(localStorage.getItem('token')).toBe('jwt_token');
    });
  });
});
