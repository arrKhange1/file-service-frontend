import { Accordion, AccordionTab } from 'primereact/accordion';
import { CollapseExpandIcon } from '../../../shared/icons/CollapseExpandIcon';
import { DirectoryItem } from '../../../entities/ui/DirectoryItem';
import styles from './PartitionList.module.scss';

export const PartitionList = () => {
  return (
    <>
      <Accordion
        expandIcon={<CollapseExpandIcon type={'expand'} width={6} height={9} />}
        collapseIcon={<CollapseExpandIcon type={'collapse'} width={6} height={9} />}
      >
        <AccordionTab header={<div className={styles.listHeader}>Your dropbox</div>}>
          <DirectoryItem isActive={true} name="Dir1" />
          <DirectoryItem isActive={false} name="Dir2" />
        </AccordionTab>
      </Accordion>
    </>
  );
};
