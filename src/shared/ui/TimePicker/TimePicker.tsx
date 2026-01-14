import { useMemo, useState } from 'react';
import { HStack } from '../Stack';
import { IOption, Select } from '../Select/Select';
import { Card } from '../Card/Card';

const TIME_OPTIONS: IOption[] = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2)
    .toString()
    .padStart(2, '0');
  const minutes = i % 2 === 0 ? '00' : '30';
  const timeStr = `${hours}:${minutes}`;
  return { id: i, name: timeStr };
});

export const TimePicker = () => {
  const [startTime, setStartTime] = useState<IOption | null>(null);
  const [endTime, setEndTime] = useState<IOption | null>(null);

  const filteredEndOptions = useMemo(() => {
    if (!startTime) return TIME_OPTIONS;
    return TIME_OPTIONS.filter((opt) => opt.name > startTime.name);
  }, [startTime]);

  return (
    <HStack gap={0}>
      <Card p={0} width="full">
        <Select
          options={TIME_OPTIONS}
          selected={startTime}
          onChange={setStartTime}
        />
      </Card>
      <Card width="full">
        <Select
          options={filteredEndOptions}
          selected={endTime}
          onChange={setEndTime}
          disabled={!startTime}
        />
      </Card>
    </HStack>
  );
};
