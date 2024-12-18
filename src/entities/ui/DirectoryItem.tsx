import { DirectoryIcon } from '../../shared/icons/DirectoryIcon';

interface DirectoryItemProps {
  isActive: boolean;
  name: string;
}

export const DirectoryItem = ({ isActive, name }: DirectoryItemProps) => {
  return (
    <>
      <div style={{ display: 'flex', gap: '12px' }}>
        <DirectoryIcon isActive={isActive} />
        <span>{name}</span>
      </div>
    </>
  );
};
