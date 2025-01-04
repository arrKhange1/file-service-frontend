import { Row, Table } from '@tanstack/react-table';
import { Cell } from '../cell/Cell';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './TableBody.module.scss';

interface TableBodyProps {
  table: Table<any>;
  onRowClick?: (row: Row<any>) => void;
  onRowSelect?: (row: Row<any>) => void;
  allowSelection: boolean;
}

export const TableBody: React.FC<TableBodyProps> = ({ table, onRowClick, onRowSelect, allowSelection }) => {
  const [selectedRow, setSelectedRow] = useState<Row<any>>();

  function selectHandler(row: Row<any>) {
    setSelectedRow(row);
    if (onRowSelect) onRowSelect(row);
  }

  function onClick(row: Row<any>) {
    if (onRowClick) onRowClick(row);
    if (allowSelection) {
      selectHandler(row);
    }
  }

  return table.getRowModel().rows.map((row) => (
    <tr
      key={row.id}
      onClick={() => onClick(row)}
      className={clsx({ [styles.rowSelected]: selectedRow?.id === row.id })}
    >
      {row.getVisibleCells().map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </tr>
  ));
};
