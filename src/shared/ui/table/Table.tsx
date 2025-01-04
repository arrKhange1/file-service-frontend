import { flexRender, Row, Table as TanstackTable } from '@tanstack/react-table';
import styles from './Table.module.scss';
import { TableBody } from './body/TableBody';

interface TableProps {
  table: TanstackTable<any>;
  onRowClick?: (row: Row<any>) => void;
  onRowSelect?: (row: Row<any>) => void;
  allowSelection: boolean;
}

export const Table: React.FC<TableProps> = ({ table, onRowClick, onRowSelect, allowSelection }) => {
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
        <TableBody table={table} onRowClick={onRowClick} onRowSelect={onRowSelect} allowSelection={allowSelection} />
      </tbody>
    </table>
  );
};
