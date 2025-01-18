import { useQuery } from '@tanstack/react-query';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { useNavigate, useParams } from 'react-router';
import { DirectoryItem } from '../../../entities/directory-item/ui/DirectoryItem';
import { Accordion } from '../../../shared/ui/accordion/Accordion';

export interface SelectPartitionProps {
  headerText: string;
}

type PartitionParams = 'partitionId';

export const SelectPartition = ({ headerText }: SelectPartitionProps) => {
  const navigate = useNavigate();

  const { data: nodes } = useQuery({
    queryKey: [FileSystemNodeService.queryKeys.FS_NODES],
    queryFn: () => FileSystemNodeService.findNodesByParentId(),
  });

  const routeParams = useParams<PartitionParams>();

  function handleRouteChange(partitionId: string) {
    navigate(`/${partitionId}`);
  }

  console.log('select partition');

  return (
    <Accordion headerText={headerText} collapsed={!routeParams.partitionId}>
      {nodes?.map(({ _id, name }) => (
        <DirectoryItem
          isActive={_id === routeParams.partitionId}
          onClick={() => handleRouteChange(_id)}
          key={_id}
          name={name}
        />
      ))}
    </Accordion>
  );
};
