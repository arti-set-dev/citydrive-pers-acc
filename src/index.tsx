import { createRoot } from 'react-dom/client';
import './app/styles/global.scss';
import { App } from './app/App';
import { GlobalErrorProvider } from './app/providers/GlobalErrorProvider/GlobalErrorProvider';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Подключите root контейнер');
}

const root = createRoot(container);
root.render(
  <GlobalErrorProvider>
    <App />
  </GlobalErrorProvider>,
);
