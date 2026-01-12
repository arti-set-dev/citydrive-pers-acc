import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const target = document.getElementById('root') as HTMLElement;
  return createPortal(children, target);
};
