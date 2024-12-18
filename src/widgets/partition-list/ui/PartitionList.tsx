import { Accordion, AccordionTab } from 'primereact/accordion';
import { DirectoryItem } from '../../../entities/ui/DirectoryItem';
import styles from './PartitionList.module.scss';
import { CollapseExpandIcon } from '../../../shared/icons/collapse-expand-icon/CollapseExpandIcon';

export const PartitionList = () => {
  return (
    <>
      <Accordion
        expandIcon={<CollapseExpandIcon type={'expand'} />}
        collapseIcon={<CollapseExpandIcon type={'collapse'} />}
      >
        <AccordionTab header={<div className={styles.listHeader}>Your dropbox</div>}>
          <DirectoryItem isActive={true} name="Dir1" />
          <DirectoryItem isActive={false} name="Директория 2" />
        </AccordionTab>
      </Accordion>
    </>
  );
};
