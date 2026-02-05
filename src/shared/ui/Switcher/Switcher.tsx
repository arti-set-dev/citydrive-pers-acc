import { Switch } from '@headlessui/react';
import styles from './Switcher.module.scss';

interface SwitcherProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
}

export function Switcher({
  checked,
  defaultChecked,
  onChange,
  name,
  value,
}: SwitcherProps) {
  return (
    <Switch
      name={name}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
      className={styles.Switcher}
      data-testid="switcher"
    >
      <span
        aria-hidden="true"
        className={styles.Thumb}
        data-testid="switcher-thumb"
      />
    </Switch>
  );
}
