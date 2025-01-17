import { PropsWithChildren, useState } from 'react';
import styles from './Accordion.module.scss';

interface AccordionProps {
  headerText: string;
}

export const Accordion = ({ children, headerText }: PropsWithChildren<AccordionProps>) => {
  const [contentCollapsed, toggleContentCollapsed] = useState(true);
  return (
    <section className={styles.accordion}>
      <header className={styles.accordionHeader} onClick={() => toggleContentCollapsed((prev) => !prev)}>
        <img className={styles.accordionCollapse} src="src/app/icons/collapse.svg" />
        <span>{headerText}</span>
      </header>
      <section className={styles.accordionContent}>{!contentCollapsed && children}</section>
    </section>
  );
};
