import { Row } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { TableRowFallback } from '../Table';
import { Cell } from '../cell/Cell';

interface TableRowProps {
  row: Row<any>;
  customRow?: (row: Row<any>, children: ReactNode) => ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ row, customRow }) => {
  if (!customRow) return <TableRowFallback row={row} />;

  return (
    <>
      {customRow(
        row,
        row.getVisibleCells().map((cell) => <Cell key={cell.id} cell={cell} />),
      ) || <TableRowFallback row={row} />}
    </>
  );
};
