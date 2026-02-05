import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ResizeObserver = ResizeObserverMock;
