import { FolderIcon } from '../../../shared/icons/FolderIcon';

export const ControlPanel = () => {
  return (
    <>
      <FolderIcon isActive={false} />
      <FolderIcon isActive={true} />
    </>
  );
};
