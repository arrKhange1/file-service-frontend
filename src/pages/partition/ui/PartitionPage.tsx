import { useParams } from 'react-router';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { AllNodesTable } from '../../../widgets/all-nodes-table/ui/AllNodesTable';
import styles from './PartitionPage.module.scss';
import { useQuery } from '@tanstack/react-query';
import { FileSystemNodesProvider } from '../../../entities/file-system-node-table/model/file-system-nodes-context';

type PartitionParams = 'partitionId';

export const PartitionPage = () => {
  const params = useParams<PartitionParams>();

  const { data: allFirstLevelNodes, isLoading } = useQuery({
    queryKey: [FileSystemNodeService.queryKeys.FS_NODES, params],
    queryFn: () => FileSystemNodeService.findNodesByParentId({ parentId: params.partitionId! }),
  });

  console.log(allFirstLevelNodes);

  return (
    <div className={styles.partitionPage}>
      {!isLoading && (
        <FileSystemNodesProvider rootNodes={allFirstLevelNodes ?? []}>
          <AllNodesTable />
        </FileSystemNodesProvider>
      )}
    </div>
  );
};
