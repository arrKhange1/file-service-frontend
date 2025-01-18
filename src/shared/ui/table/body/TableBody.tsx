import { Row, Table } from '@tanstack/react-table';
import { Cell } from '../cell/Cell';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './TableBody.module.scss';

interface TableBodyProps<T> {
  table: Table<T>;
  selectRowFn: (tableRow: Row<T>, selectedRow?: Row<T>) => boolean;
  onRowClick?: (row: Row<T>) => void;
  onRowSelect?: (row: Row<T>) => void;
  allowSelection: boolean;
}

export function TableBody<T>({ table, onRowClick, onRowSelect, allowSelection, selectRowFn }: TableBodyProps<T>) {
  const [selectedRow, setSelectedRow] = useState<Row<T>>();

  function selectHandler(row: Row<T>) {
    setSelectedRow(row);
    if (onRowSelect) onRowSelect(row);
  }

  function onClick(row: Row<T>) {
    if (onRowClick) onRowClick(row);
    if (allowSelection) {
      selectHandler(row);
    }
  }

  return table.getRowModel().rows.map((row) => (
    <tr
      key={row.id}
      onClick={() => onClick(row)}
      className={clsx({ [styles.rowSelected]: selectRowFn(row, selectedRow) })}
    >
      {row.getVisibleCells().map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </tr>
  ));
}
