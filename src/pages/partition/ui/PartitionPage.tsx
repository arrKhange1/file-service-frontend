import { useParams } from 'react-router';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { AllNodesTable } from '../../../widgets/ui/all-nodes-table/AllNodesTable';
import styles from './PartitionPage.module.scss';
import { useQuery } from '@tanstack/react-query';

type PartitionParams = 'partitionId';

export const PartitionPage = () => {
  const params = useParams<PartitionParams>();

  const { data: allFirstLevelNodes, isLoading } = useQuery({
    queryKey: [FileSystemNodeService.queryKeys.FS_NODES, params.partitionId],
    queryFn: () => FileSystemNodeService.findNodesByParentId({ parentId: params.partitionId! }),
  });

  return (
    <div className={styles.partitionPage}>
      {!isLoading && <AllNodesTable firstLevelNodes={allFirstLevelNodes ?? []} />}
    </div>
  );
};
