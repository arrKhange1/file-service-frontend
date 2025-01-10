import { PropsWithChildren } from 'react';
import styles from './FieldWrapper.module.scss';

interface FieldWrapperProps extends PropsWithChildren {
  title: string;
  errorMessage?: string;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ title, errorMessage, children }) => {
  return (
    <div className={styles.fieldWrapper}>
      <label>{title}</label>
      {children}
      {errorMessage && <span className={styles.fieldError}>{errorMessage}</span>}
    </div>
  );
};
