import { useEffect, useRef, useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { HStack, VStack } from '../Stack';
import { ru } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import styles from './DatePicker.module.scss';
import { Field } from '../Field/Field';
import CalendarIcon from '@/shared/assets/icons/calendar-minus.svg';

interface DatePickerProps {
  fullWidth?: boolean;
}

export const DatePicker = ({ fullWidth = false }: DatePickerProps) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const startDisplay = range?.from ? format(range.from, 'dd.MM.yyyy') : '';
  const endDisplay = range?.to ? format(range.to, 'dd.MM.yyyy') : '';

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <VStack ref={containerRef}>
      <HStack gap={0}>
        <Field
          fullWidth={fullWidth}
          name="start-date"
          readOnly
          icon={CalendarIcon}
          placeholder="За период с"
          value={startDisplay}
          onClick={() => setIsOpen(true)}
        />
        <Field
          name="end-date"
          fullWidth={fullWidth}
          icon={CalendarIcon}
          placeholder="По"
          value={endDisplay}
          readOnly
          disabled={!range?.from}
          onClick={() => setIsOpen(true)}
        />
      </HStack>

      {isOpen && (
        <DayPicker
          locale={ru}
          mode="range"
          selected={range}
          onSelect={(newRange) => {
            setRange(newRange);
            if (newRange?.from && newRange?.to) setIsOpen(false);
          }}
          className={styles.DatePicker}
          disabled={{ before: new Date() }}
        />
      )}
    </VStack>
  );
};
