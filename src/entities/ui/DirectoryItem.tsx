import clsx from 'clsx';
import { DirectoryIcon } from '../../shared/icons/DirectoryIcon';
import styles from './DirectoryItem.module.scss';

interface DirectoryItemProps {
  isActive?: boolean;
  name: string;
  onClick?: () => void;
}

export const DirectoryItem = ({ isActive = false, name, onClick }: DirectoryItemProps) => {
  return (
    <>
      <div onClick={onClick} className={clsx(styles.item, { [styles.itemActive]: isActive })}>
        <DirectoryIcon isActive={isActive} />
        <span>{name}</span>
      </div>
    </>
  );
};
