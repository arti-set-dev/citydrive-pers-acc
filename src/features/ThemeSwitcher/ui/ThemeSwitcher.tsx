import { useTheme } from '@citydrive/shared/lib/context/ThemeContext';
import { Button } from '@citydrive/shared/ui/Button/Button';
import ThemeIcon from '@citydrive/shared/assets/icons/sun-dim.svg';

export const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <Button variant="clear" onClick={toggleTheme}>
      <ThemeIcon width={40} height={40} />
    </Button>
  );
};
