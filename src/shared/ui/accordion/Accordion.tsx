import { CollapseExpandIcon } from '../../icons/collapse-expand-icon/CollapseExpandIcon';
import { PropsWithChildren, useState } from 'react';
import styles from './Accordion.module.scss';

interface AccordionProps {
  headerText: string;
}

export const Accordion = ({ children, headerText }: PropsWithChildren<AccordionProps>) => {
  const [contentCollapsed, setContentCollapsed] = useState(true);
  return (
    // <Accordion
    //   expandIcon={<CollapseExpandIcon type={'expand'} />}
    //   collapseIcon={<CollapseExpandIcon type={'collapse'} />}
    //   className={styles.list}
    // >
    //   <AccordionTab header={<div className={styles.listHeader}>{headerText}</div>}>{children}</AccordionTab>
    // </Accordion>
    <section className={styles.accordion}>
      <header className={styles.accordionHeader}>
        {contentCollapsed && <span onClick={() => setContentCollapsed(false)}>Expand</span>}
        {!contentCollapsed && <span onClick={() => setContentCollapsed(true)}>Collapse</span>}
        <span>{headerText}</span>
      </header>
      <section className={styles.accordionContent}>{!contentCollapsed && children}</section>
    </section>
  );
};
