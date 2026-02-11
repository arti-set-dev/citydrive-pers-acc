import { createContext, useContext } from 'react';
import { FeatureFlags } from '../../types/featureFlags';

export const FeatureFlagContext = createContext<FeatureFlags>({});

export const useFeatureFlags = () => useContext(FeatureFlagContext);
