import clsx from 'clsx';
import { DirectoryIcon } from '../../shared/icons/DirectoryIcon';
import styles from './DirectoryItem.module.scss';

interface DirectoryItemProps {
  isActive: boolean;
  name: string;
}

export const DirectoryItem = ({ isActive, name }: DirectoryItemProps) => {
  return (
    <>
      <div className={clsx(styles.item, { [styles.itemActive]: isActive })}>
        <DirectoryIcon isActive={isActive} />
        <span>{name}</span>
      </div>
    </>
  );
};
