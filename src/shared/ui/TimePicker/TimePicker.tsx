import { useMemo } from 'react';
import { HStack, VStack } from '../Stack';
import { IOption, Select } from '../Select/Select';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';

const TIME_OPTIONS: IOption[] = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2)
    .toString()
    .padStart(2, '0');
  const minutes = i % 2 === 0 ? '00' : '30';
  const timeStr = `${hours}:${minutes}`;
  return { id: i, name: timeStr };
});

interface TimePickerProps {
  value?: { start: string; end: string };
  onChange?: (value: { start: string; end: string }) => void;
  error?: string;
}

export const TimePicker = ({ value, onChange, error }: TimePickerProps) => {
  const startTime =
    TIME_OPTIONS.find((opt) => opt.name === value?.start) || null;
  const endTime = TIME_OPTIONS.find((opt) => opt.name === value?.end) || null;

  const filteredEndOptions = useMemo(() => {
    if (!startTime) return TIME_OPTIONS;
    return TIME_OPTIONS.filter((opt) => opt.name > startTime.name);
  }, [startTime]);

  const handleStartChange = (opt: IOption | null) => {
    if (!opt) return;

    onChange?.({
      start: opt.name,
      end: endTime && opt.name < endTime.name ? endTime.name : '',
    });
  };

  const handleEndChange = (opt: IOption | null) => {
    if (!opt || !value?.start) return;

    onChange?.({
      start: value.start,
      end: opt.name,
    });
  };

  return (
    <VStack>
      <HStack gap={0}>
        <Card p={0} width="full">
          <Select
            options={TIME_OPTIONS}
            selected={startTime}
            onChange={handleStartChange}
            placeholder="От"
          />
        </Card>
        <Card width="full">
          <Select
            options={filteredEndOptions}
            selected={endTime}
            onChange={handleEndChange}
            disabled={!startTime}
            placeholder="До"
          />
        </Card>
      </HStack>
      {error && (
        <Text color="danger" size={12}>
          {error}
        </Text>
      )}
    </VStack>
  );
};
