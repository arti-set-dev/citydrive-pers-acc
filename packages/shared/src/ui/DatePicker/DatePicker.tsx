import { useEffect, useRef, useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Flex, VStack } from '../Stack';
import { ru } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import styles from './DatePicker.module.scss';
import { Field } from '../Field/Field';
import CalendarIcon from '@citydrive/shared/assets/icons/calendar-minus.svg';

interface DatePickerProps {
  fullWidth?: boolean;
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  error?: string;
  disabledBefore?: Date;
  'data-testid'?: string;
}

export const DatePicker = ({
  fullWidth = false,
  onChange,
  value,
  error,
  disabledBefore,
  'data-testid': testId = 'DatePicker',
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const startDisplay = value?.from ? format(value.from, 'dd.MM.yyyy') : '';
  const endDisplay = value?.to ? format(value.to, 'dd.MM.yyyy') : '';

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <VStack ref={containerRef} gap={4} align="start" data-testid={testId}>
      <Flex direction={{ base: 'row', lg: 'row' }} gap={0}>
        <Field
          fullWidth={fullWidth}
          name="start-date"
          readOnly
          icon={CalendarIcon}
          placeholder="За период с"
          value={startDisplay}
          onClick={() => setIsOpen(true)}
          error={error ? ' ' : undefined}
          data-testid={`${testId}.StartField`}
        />
        <Field
          name="end-date"
          fullWidth={fullWidth}
          icon={CalendarIcon}
          placeholder="По"
          value={endDisplay}
          readOnly
          disabled={!value?.from}
          onClick={() => setIsOpen(true)}
          error={error ? ' ' : undefined}
          data-testid={`${testId}.EndField`}
        />
      </Flex>

      {error && <span className={styles.ErrorMessage}>{error}</span>}

      {isOpen && (
        <div className={styles.Popover} data-testid={`${testId}.Popover`}>
          <DayPicker
            locale={ru}
            mode="range"
            selected={value}
            onSelect={(newRange) => {
              onChange?.(newRange);
              if (newRange?.from && newRange?.to) setIsOpen(false);
            }}
            className={styles.DatePicker}
            disabled={
              disabledBefore
                ? { before: disabledBefore }
                : { before: new Date() }
            }
          />
        </div>
      )}
    </VStack>
  );
};
