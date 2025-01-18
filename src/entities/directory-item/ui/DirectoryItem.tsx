import clsx from 'clsx';
import styles from './DirectoryItem.module.scss';
import { DirectoryIcon } from '../../../shared/icons/DirectoryIcon';

interface DirectoryItemProps {
  isActive?: boolean;
  name: string;
  onClick?: () => void;
}

export const DirectoryItem = ({ isActive = false, name, onClick }: DirectoryItemProps) => {
  return (
    <>
      <div onClick={onClick} className={clsx(styles.item, { [styles.itemActive]: isActive })}>
        <span>
          <DirectoryIcon isActive={isActive} />
        </span>
        <span>{name}</span>
      </div>
    </>
  );
};
