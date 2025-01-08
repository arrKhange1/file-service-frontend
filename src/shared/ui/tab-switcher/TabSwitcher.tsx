import { useMemo, useState } from 'react';
import styles from './TabSwitcher.module.scss';
import clsx from 'clsx';

interface Tab {
  header: string;
  content: JSX.Element;
}

interface TabSwitcherProps {
  tabs: Tab[];
}

interface TabsSwitcherHeaderProps {
  tabs: Tab[];
  onTabChange: (idx: number) => void;
  selectedTabIdx: number;
}

const TabsSwitcherHeader: React.FC<TabsSwitcherHeaderProps> = ({ tabs, selectedTabIdx, onTabChange }) => {
  return (
    <div className={styles.tabsHeader}>
      {tabs.map((tab, idx) => (
        <button
          className={clsx(styles.tab, { [styles.tabSelected]: selectedTabIdx === idx })}
          key={idx}
          onClick={() => onTabChange(idx)}
        >
          {tab.header}
        </button>
      ))}
    </div>
  );
};

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs }) => {
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);
  const selectedTab = useMemo(() => tabs.find((tab, idx) => idx === selectedTabIdx), [selectedTabIdx]);

  return (
    <div className={styles.tabsSwitcher}>
      <TabsSwitcherHeader selectedTabIdx={selectedTabIdx} tabs={tabs} onTabChange={setSelectedTabIdx} />
      <div className={styles.tabs}>{selectedTab?.content || 'Empty tab'}</div>
    </div>
  );
};
