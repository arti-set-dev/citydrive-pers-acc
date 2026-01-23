import { LoginSchema } from '@/features/login';

export interface StateSchema {
  // Статические редюсеры
  // Асинхронные редюсеры
  login?: LoginSchema;
}
