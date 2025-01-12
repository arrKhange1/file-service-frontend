import { Accordion, AccordionTab } from 'primereact/accordion';
import { CollapseExpandIcon } from '../../icons/collapse-expand-icon/CollapseExpandIcon';
import { PropsWithChildren } from 'react';
import styles from './AccordionList.module.scss';

interface AccordionListProps {
  headerText: string;
}

export const AccordionList = ({ children, headerText }: PropsWithChildren<AccordionListProps>) => {
  return (
    <Accordion
      expandIcon={<CollapseExpandIcon type={'expand'} />}
      collapseIcon={<CollapseExpandIcon type={'collapse'} />}
      className={styles.list}
    >
      <AccordionTab header={<div className={styles.listHeader}>{headerText}</div>}>{children}</AccordionTab>
    </Accordion>
  );
};
