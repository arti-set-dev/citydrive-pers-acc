import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import { App } from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Подключите root контейнер');
}

const root = createRoot(container);
root.render(<App />);
