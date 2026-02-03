import { ReactNode } from 'react';
import { useFeatureFlags } from './FeatureFlagContext';
import { FeatureFlags } from '../../types/featureFlags';

interface ToggleFeatureProps {
  name: keyof FeatureFlags;
  on: ReactNode;
  off: ReactNode;
}

export const ToggleFeature = ({ name, on, off }: ToggleFeatureProps) => {
  const flags = useFeatureFlags();

  if (flags[name]) {
    return <>{on}</>;
  }

  return <>{off}</>;
};
