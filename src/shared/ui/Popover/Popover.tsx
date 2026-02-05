import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import EllipsisVerticalIcon from '@/shared/assets/icons/ellipsis-vertical.svg';
import { Button } from '../Button/Button';
import styles from './Popover.module.scss';
import React from 'react';

interface ActionPopoverProps {
  children: React.ReactNode;
}

export function ActionPopover({ children }: ActionPopoverProps) {
  return (
    <Popover className={styles.Popover}>
      <PopoverButton as={Button} variant="clear" data-testid="popover-btn">
        <EllipsisVerticalIcon />
      </PopoverButton>

      <PopoverPanel
        anchor="left start"
        className={styles.PopoverPanel}
        data-testid="popover-panel"
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}
