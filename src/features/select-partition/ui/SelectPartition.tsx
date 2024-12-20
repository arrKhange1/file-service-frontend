import { AccordionList } from '../../../shared/ui/accordion-list/AccordionList';
import { DirectoryItem } from '../../../entities/ui/DirectoryItem';
import { useQuery } from '@tanstack/react-query';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';

interface SelectPartitionProps {
  headerText: string;
}

export const SelectPartition = ({ headerText }: SelectPartitionProps) => {
  const { isLoading, data: nodes } = useQuery({
    queryKey: [FileSystemNodeService.queryKeys.FS_NODES],
    queryFn: () => FileSystemNodeService.findNodesByParentId(),
  });

  return (
    <AccordionList headerText={headerText}>
      {isLoading && <div>Loading...</div>}
      {nodes?.length !== 0 && nodes?.map(({ _id, name }) => <DirectoryItem key={_id} name={name} />)}
    </AccordionList>
  );
};
