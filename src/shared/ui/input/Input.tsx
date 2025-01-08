import { forwardRef } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

const Input = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, type, ...props }, ref) => {
  return <input type={type} className={clsx(className, styles.input)} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
