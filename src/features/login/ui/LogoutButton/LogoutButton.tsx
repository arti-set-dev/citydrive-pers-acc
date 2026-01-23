import { Button } from '@/shared/ui/Button/Button';
import LoginIcon from '@/shared/assets/icons/log-in.svg';
import { useAsyncReducer } from '@/shared/hooks/useAsyncReducer/useAsyncReducer';
import {
  loginActions,
  loginReducer,
} from '../../model/slices/loginSlice/loginSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';

export const LogoutButton = () => {
  useAsyncReducer('login', loginReducer, { removeAfterUnmount: false });
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(loginActions.setIsAuth(false));
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };
  return (
    <Button icon={LoginIcon} variant="clear" onClick={onLogout}>
      Выйти
    </Button>
  );
};
