import React from 'react';
import { Card } from '../Card/Card';
import styles from './Modal.module.scss';
import clsx from 'clsx';
import { Portal } from '../Portal/Portal';
import { Button } from '../Button/Button';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        onClick={onClose}
        className={clsx(styles.Overlay, { [styles.isOpen]: isOpen })}
      >
        <Card
          width={540}
          r={16}
          onClick={(e) => e.stopPropagation()}
          p={24}
          variant="bg-primary"
        >
          <Button variant="close" onClick={onClose} className={styles.Close} />
          {children}
        </Card>
      </div>
    </Portal>
  );
};
