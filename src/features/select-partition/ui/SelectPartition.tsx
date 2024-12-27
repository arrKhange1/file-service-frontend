import { AccordionList } from '../../../shared/ui/accordion-list/AccordionList';
import { DirectoryItem } from '../../../entities/ui/DirectoryItem';
import { useQuery } from '@tanstack/react-query';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { useNavigate, useParams } from 'react-router';

export interface SelectPartitionProps {
  headerText: string;
}

type PartitionParams = 'partitionId';

// TODO: при перезагрузке страницы если в params partitionId === одному из nodes, то открыть аккордион

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
    <AccordionList headerText={headerText}>
      {nodes?.length !== 0 &&
        nodes?.map(({ _id, name }) => (
          <DirectoryItem
            isActive={_id === routeParams.partitionId}
            onClick={() => handleRouteChange(_id)}
            key={_id}
            name={name}
          />
        ))}
    </AccordionList>
  );
};
