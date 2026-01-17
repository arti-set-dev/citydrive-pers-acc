import { getRouteHome } from '@/shared/lib/router/paths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import notFoundImage from '@/shared/assets/images/404.png';
import { AppImage } from '@/shared/ui/AppImage/AppImage';

export const NotFoundPage = () => {
  return (
    <Card p={16}>
      <VStack gap={24} align="center">
        <AppImage alt="404 image" src={notFoundImage} />
        <Text color="brand" weight="bold" size={40}>
          404
        </Text>
        <Text weight="medium" size={18}>
          Упс, эта страница не найдена...
        </Text>
        <Text weight="regular" color="text-tertiary">
          Возможно, она была удалена или вы перешли по неверной ссылке
        </Text>
        <AppLink to={getRouteHome()} variant="bg-primary">
          Вернуться на главную
        </AppLink>
      </VStack>
    </Card>
  );
};
