import { flexRender, Row, Table as TanstackTable } from '@tanstack/react-table';
import styles from './Table.module.scss';
import { TableBody } from './body/TableBody';

interface TableProps<T> {
  table: TanstackTable<T>;
  onRowClick?: (row: Row<T>) => void;
  onRowSelect?: (row: Row<T>) => void;
  selectRowFn: (tableRow: Row<T>, selectedRow?: Row<T>) => boolean;
  allowSelection: boolean;
}

export function Table<T>({ table, onRowClick, onRowSelect, allowSelection, selectRowFn }: TableProps<T>) {
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
        <TableBody
          table={table}
          onRowClick={onRowClick}
          onRowSelect={onRowSelect}
          allowSelection={allowSelection}
          selectRowFn={selectRowFn}
        />
      </tbody>
    </table>
  );
}
