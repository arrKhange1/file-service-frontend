import React from 'react';
import { Input } from '../../../../shared/ui/input/Input';
import { AllNodesContext } from '../../../../widgets/all-nodes-table/store/all-nodes-context';
import styles from '../AddNodeForm.module.scss';

interface AddDirectoryFormProps {
  onHide: () => void;
}

export const AddDirectoryForm: React.FC<AddDirectoryFormProps> = ({ onHide }) => {
  const ctx = React.useContext(AllNodesContext);
  console.log(ctx);
  return (
    <form className={styles.form} onSubmit={() => onHide()}>
      <Input type="text" placeholder="Название директории..." />
      <Input className={styles.submitBtn} type="submit" value="Добавить" />
    </form>
  );
};
