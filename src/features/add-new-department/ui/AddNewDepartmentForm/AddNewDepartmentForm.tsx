import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { getEmployeeData } from '@/entities/Employee';
import { useCreateDepartmentMutation } from '../../api/addNewDepartmentApi';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';

interface FormValues {
  name: string;
  limit: string;
}

export const AddNewDepartmentForm = () => {
  const employeeData = useAppSelector(getEmployeeData);
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: '', limit: '' },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createDepartment({
        name: data.name,
        limit: Number(data.limit),
        companyId: employeeData!.companyId,
        spent: 0,
        employeesIds: [],
      }).unwrap();
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card p={0} width={540}>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} gap={16}>
        <VStack as="label" gap={4} align="stretch">
          <Text>Название отдела</Text>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Введите название' }}
            render={({ field: { onChange, value } }) => (
              <Field
                value={value}
                onChange={onChange}
                placeholder="Название отдела"
                error={errors.name?.message}
              />
            )}
          />
        </VStack>

        <VStack as="label" gap={4} align="stretch">
          <Text>Лимит отдела</Text>
          <Controller
            name="limit"
            control={control}
            rules={{ required: 'Укажите лимит' }}
            render={({ field: { onChange, value } }) => (
              <Field
                type="number"
                value={value}
                onChange={onChange}
                placeholder="Лимит отдела"
                error={errors.limit?.message}
              />
            )}
          />
        </VStack>

        <Button type="submit" disabled={isLoading}>
          Добавить отдел
        </Button>
      </VStack>
    </Card>
  );
};
