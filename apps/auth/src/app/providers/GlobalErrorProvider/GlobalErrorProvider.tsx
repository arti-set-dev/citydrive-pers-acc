import { PropsWithChildren } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>Произошла критическая ошибка</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Перезапустить приложение</button>
  </div>
);

export const GlobalErrorProvider = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      FallbackComponent={GlobalErrorFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
};
