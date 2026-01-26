import { getEmployeeData } from '@/entities/Employee';
import { ImportDataAboutCompanyButton } from '@/features/import-data-about-company';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Switcher } from '@/shared/ui/Switcher/Switcher';
import { Text } from '@/shared/ui/Text/Text';

const SettingsPage = () => {
  const employeeData = useAppSelector(getEmployeeData);

  return (
    <Card p={16}>
      <Text weight="bold" size={32}>
        Настройки
      </Text>
      <VStack gap={16}>
        <Card borderLine="bottom">
          <HStack gap={16} as="label">
            <Text size={{ base: 28, sm: 18 }}>
              Уведомления о новых сотрудниках
            </Text>
            <Switcher checked name="new-employees" />
          </HStack>
        </Card>

        <Card borderLine="bottom">
          <HStack gap={16} as="label">
            <Text size={{ base: 28, sm: 18 }}>Эксперементальные фичи</Text>
            <Switcher />
          </HStack>
        </Card>
        <Card borderLine="bottom">
          <HStack gap={16}>
            <Text size={{ base: 28, sm: 18 }}>
              <ImportDataAboutCompanyButton
                companyId={employeeData?.companyId}
              />
            </Text>
          </HStack>
        </Card>
      </VStack>
    </Card>
  );
};

export default SettingsPage;
