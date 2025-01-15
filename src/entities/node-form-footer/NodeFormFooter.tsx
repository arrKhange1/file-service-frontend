import { useFormContext } from 'react-hook-form';
import { Input } from '../../shared/ui/input/Input/Input';
import styles from './NodeFormFooter.module.scss';
import { ReactNode } from 'react';

interface NodeFormFooterProps {
  actionName: string;
  currentDir: ReactNode;
}

export const NodeFormFooter: React.FC<NodeFormFooterProps> = ({ actionName, currentDir }) => {
  const {
    formState: { isValid },
  } = useFormContext();
  return (
    <section className={styles.formFooter}>
      {currentDir}
      <Input className={styles.submitBtn} type="submit" value={actionName} disabled={!isValid} />
    </section>
  );
};
