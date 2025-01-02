import { Cell as TanstackCell, flexRender } from '@tanstack/react-table';

interface CellProps {
  cell: TanstackCell<any, unknown>;
}

export const Cell: React.FC<CellProps> = ({ cell }) => {
  return (
    <td style={{ width: `calc(${cell.column.getSize()}%)` }} key={cell.id}>
      <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
    </td>
  );
};
