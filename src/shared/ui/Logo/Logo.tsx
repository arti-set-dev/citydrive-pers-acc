import { Link, useLocation } from 'react-router-dom';
import { AppImage } from '../AppImage/AppImage';
import { VStack } from '../Stack';
import { Text } from '../Text/Text';
import styles from './Logo.module.scss';
import { PATHS } from '@/shared/lib/router/paths';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === PATHS.home;

  const content = (
    <VStack as="span" align="center" gap={8} className={className}>
      <AppImage src="/logo.png" width="200" alt="Логотип Ситидрайв" />
      <Text as="span" className={styles.LogoText}>
        для бизнеса
      </Text>
    </VStack>
  );
  return isHomePage ? (
    content
  ) : (
    <Link className={styles.LogoLink} to="/">
      {content}
    </Link>
  );
};
