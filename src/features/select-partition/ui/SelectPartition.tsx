import { AccordionList } from '../../../shared/ui/accordion-list/AccordionList';
import { DirectoryItem } from '../../../entities/ui/DirectoryItem';

interface SelectPartitionProps {
  headerText: string;
}

export const SelectPartition = ({ headerText }: SelectPartitionProps) => {
  return (
    <AccordionList headerText={headerText}>
      <DirectoryItem isActive={true} name="Dir1" />
      <DirectoryItem isActive={false} name="Директория 2" />
    </AccordionList>
  );
};
