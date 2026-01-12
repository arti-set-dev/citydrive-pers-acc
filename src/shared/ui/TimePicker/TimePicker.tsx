import { useState } from 'react';
import { HStack } from '../Stack';

export const TimePicker = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <HStack>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        value={endTime}
        disabled={startTime ? false : true}
        onChange={(e) => setEndTime(e.target.value)}
      />
    </HStack>
  );
};
