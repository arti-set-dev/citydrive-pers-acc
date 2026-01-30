import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { Text } from '@/shared/ui/Text/Text';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack';
import { Field } from '@/shared/ui/Field/Field';
import { Button } from '@/shared/ui/Button/Button';
import { useUpdateDepartmentMutation } from '../api/editDepartmentApi';
import { getRouteDepartments } from '@/shared/lib/router/paths';
import { Loader } from '@/shared/ui/Loader/Loader';
import { useGetDepartmentByIdQuery } from '@/entities/Department';

interface FormValues {
  name: string;
  limit: string;
}

export const EditDepartmentForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: department, isLoading: isFetching } = useGetDepartmentByIdQuery(
    id!,
  );
  const [updateDepartment, { isLoading: isUpdating }] =
    useUpdateDepartmentMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      limit: '',
    },
  });

  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
        limit: String(department.limit),
      });
    }
  }, [department, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      await updateDepartment({
        id: id!,
        name: data.name,
        limit: Number(data.limit),
      }).unwrap();
      navigate(getRouteDepartments());
    } catch (e) {
      console.error(e);
    }
  };

  if (isFetching) return <Loader />;

  return (
    <Card p={0} width={540}>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} gap={16}>
        <VStack as="label" gap={4} align="stretch">
          <Text>Название отдела</Text>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field }) => (
              <Field
                {...field}
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
            rules={{ required: 'Обязательное поле' }}
            render={({ field }) => (
              <Field
                {...field}
                type="number"
                placeholder="Лимит"
                error={errors.limit?.message}
              />
            )}
          />
        </VStack>

        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </VStack>
    </Card>
  );
};
