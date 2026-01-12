import { Button } from '@/shared/ui/Button/Button';
import LoginIcon from '@/shared/assets/icons/log-in.svg';

export const Login = () => {
  return (
    <Button icon={LoginIcon} variant="clear">
      Войти
    </Button>
  );
};
