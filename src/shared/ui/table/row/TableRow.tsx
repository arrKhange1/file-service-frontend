import { Row } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { Cell } from '../cell/Cell';
import { DefaultTableRow } from '../Table';

interface TableRowProps {
  row: Row<any>;
  renderCustomRow?: (row: Row<any>, children: ReactNode) => ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ row, renderCustomRow }) => {
  if (!renderCustomRow) return <DefaultTableRow row={row} />;

  return (
    <>
      {renderCustomRow(
        row,
        row.getVisibleCells().map((cell) => <Cell key={cell.id} cell={cell} />),
      ) ?? <DefaultTableRow row={row} />}
    </>
  );
};
