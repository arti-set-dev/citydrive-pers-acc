import { Button } from '@/shared/ui/Button/Button';
import LoginIcon from '@/shared/assets/icons/log-in.svg';

export const LogoutButton = () => {
  return (
    <Button icon={LoginIcon} variant="clear">
      Выйти
    </Button>
  );
};
