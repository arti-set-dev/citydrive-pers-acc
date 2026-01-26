import { Link, useLocation } from 'react-router-dom';
import { AppImage } from '../AppImage/AppImage';
import { VStack } from '../Stack';
import { Text } from '../Text/Text';
import styles from './Logo.module.scss';
import { PATHS } from '@/shared/lib/router/paths';

interface LogoProps {
  className?: string;
  companyName?: string;
}

export const Logo = ({ className, companyName }: LogoProps) => {
  const { pathname } = useLocation();
  let withoutLink;

  switch (pathname) {
    case PATHS.home:
    case PATHS.auth:
    case PATHS.resetPassword:
    case PATHS.forgotPassword:
      withoutLink = true;
      break;
    default:
      withoutLink = false;
  }

  const content = (
    <VStack as="span" align="center" gap={8} className={className}>
      <AppImage src="/logo.png" width="200" alt="Логотип Ситидрайв" />
      <Text as="span" className={styles.LogoText}>
        для бизнеса
      </Text>
      {companyName && <Text color="text-tertiary">{companyName}</Text>}
    </VStack>
  );
  return withoutLink ? (
    content
  ) : (
    <Link className={styles.LogoLink} to="/">
      {content}
    </Link>
  );
};
