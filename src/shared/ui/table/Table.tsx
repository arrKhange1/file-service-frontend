import { flexRender, Row, Table as TanstackTable } from '@tanstack/react-table';
import styles from './Table.module.scss';
import { Fragment, ReactNode } from 'react';
import { Cell } from './cell/Cell';
import { TableRow } from './row/TableRow';

interface TableRowFallbackProps {
  row: Row<any>;
}

export const TableRowFallback: React.FC<TableRowFallbackProps> = ({ row }) => {
  return (
    <tr>
      {row.getVisibleCells().map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
};

interface TableProps {
  table: TanstackTable<any>;
  customRow?: (row: Row<any>, children: ReactNode) => ReactNode;
}

export const Table: React.FC<TableProps> = ({ table, customRow }) => {
  return (
    <table className={styles['table-container']} cellSpacing={0}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th style={{ width: `calc(${header.column.getSize()}%)` }} key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} row={row} customRow={customRow} />
        ))}
      </tbody>
    </table>
  );
};
