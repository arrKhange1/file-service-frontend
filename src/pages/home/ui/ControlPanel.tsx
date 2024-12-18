import { DirectoryItem } from '../../../entities/ui/DirectoryItem';
import { PartitionList } from '../../../widgets/partition-list/ui/Partition-list';

export const ControlPanel = () => {
  return (
    <>
      <DirectoryItem name="events" isActive={true} />
      <DirectoryItem name="products" isActive={false} />
      <PartitionList />
    </>
  );
};
