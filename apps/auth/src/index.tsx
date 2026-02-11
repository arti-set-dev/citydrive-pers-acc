import { createRoot } from 'react-dom/client';
import '@citydrive/shared/styles/global.scss';
import { App } from './app/App';
import { GlobalErrorProvider } from './app/providers/GlobalErrorProvider/GlobalErrorProvider';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { ThemeProvider } from '@citydrive/shared/lib/context/ThemeProvider';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Подключите root контейнер');
}

const root = createRoot(container);
root.render(
  <GlobalErrorProvider>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </GlobalErrorProvider>,
);
