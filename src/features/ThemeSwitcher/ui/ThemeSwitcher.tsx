import { useTheme } from '@/shared/lib/context/ThemeContext';
import { Button } from '@/shared/ui/Button/Button';
import ThemeIcon from '@/shared/assets/icons/sun-dim.svg';

export const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <Button variant="clear" onClick={toggleTheme}>
      <ThemeIcon width={40} height={40} />
    </Button>
  );
};
