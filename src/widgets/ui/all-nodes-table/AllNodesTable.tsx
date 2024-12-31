import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect } from 'react';
import { FileSystemNode, FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import styles from './AllNodesTable.module.scss';
import { DirectoryIcon } from '../../../shared/icons/DirectoryIcon';
import { FileIcon } from '../../../shared/icons/FileIcon';

interface AllNodeTableProps {
  firstLevelNodes: FileSystemNodeWithSubRows[];
}

interface FileSystemNodeWithSubRows extends FileSystemNode {
  subRows?: FileSystemNodeWithSubRows[];
}

////

function addNode(
  oldData: FileSystemNodeWithSubRows[],
  id: string,
  nodeAdd: FileSystemNodeWithSubRows,
): FileSystemNodeWithSubRows[] {
  const addFn = (rows: FileSystemNodeWithSubRows[], id: string, row: FileSystemNodeWithSubRows) => {
    const rowWithAddedNode: FileSystemNodeWithSubRows = { ...row, subRows: [...(row.subRows ?? []), nodeAdd] };
    return rows.map((row) => (row._id === id ? rowWithAddedNode : row));
  };
  return mutateNodes(oldData, id, addFn);
}

function deleteNode(oldData: FileSystemNodeWithSubRows[], id: string): FileSystemNodeWithSubRows[] {
  const deleteFn = (rows: FileSystemNodeWithSubRows[]) => rows.filter((row) => row._id !== id);
  return mutateNodes(oldData, id, deleteFn);
}

function updateNode(
  oldData: FileSystemNodeWithSubRows[],
  id: string,
  nodeUpdate: Partial<FileSystemNodeWithSubRows>,
): FileSystemNodeWithSubRows[] {
  const updateFn = (rows: FileSystemNodeWithSubRows[]) =>
    rows.map((row) => (row._id === id ? { ...row, ...nodeUpdate } : row));
  return mutateNodes(oldData, id, updateFn);
}

function mutateNodes(
  oldData: FileSystemNodeWithSubRows[],
  id: string,
  mutateFn: (
    rows: FileSystemNodeWithSubRows[],
    id: string,
    row: FileSystemNodeWithSubRows,
  ) => FileSystemNodeWithSubRows[],
): FileSystemNodeWithSubRows[] {
  function nodeUpdater(rows: FileSystemNodeWithSubRows[]): FileSystemNodeWithSubRows[] {
    if (!oldData.length) return [];
    const searchingRow = rows.find((row) => row._id === id);
    if (searchingRow !== undefined) return mutateFn(rows, id, searchingRow);
    return rows.map((row) => (row.subRows ? { ...row, subRows: nodeUpdater(row.subRows) } : row));
  }

  return nodeUpdater(oldData);
}

export const AllNodesTable = ({ firstLevelNodes }: AllNodeTableProps) => {
  const columns = React.useMemo<ColumnDef<FileSystemNodeWithSubRows>[]>(
    () => [
      {
        id: '1',
        size: 40,
        accessorFn: (row) => row.name,
        header: () => 'Name',
        cell: ({ row, getValue }) => (
          <div style={{ paddingLeft: `${row.depth + 0.5}rem`, display: 'flex', alignItems: 'center', gap: '1em' }}>
            {row.getCanExpand() ? (
              <>{row.getIsExpanded() ? <DirectoryIcon isActive={true} /> : <DirectoryIcon isActive={false} />}</>
            ) : (
              <FileIcon />
            )}{' '}
            {getValue<string>()}{' '}
            {/* {row.original.type === 'DIRECTORY' && (
                <button
                  onClick={async () => {
                    const dir = await FileSystemNodeService.addDirectory({
                      name: 'New Dir',
                      parentId: row.original._id,
                    });
                    setData((prevData) => addNode(prevData, row.original._id, dir));
                  }}
                >
                  Add Dir
                </button>
              )}
              <button
                onClick={async () => {
                  const status = await FileSystemNodeService.deleteNodeById({ id: row.original._id });
                  if (200 === status) setData((prevData) => deleteNode(prevData, row.original._id));
                }}
              >
                Delete
              </button> */}
          </div>
        ),
      },
      {
        id: '2',
        size: 30,
        accessorFn: (row) => row.type,
        header: () => <div>Type</div>,
        cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      },
      {
        id: '3',
        size: 30,
        accessorFn: (row) => row.parentId,
        header: () => <div>Parent ID</div>,
        cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      },
    ],
    [],
  );

  const [data, setData] = React.useState<FileSystemNodeWithSubRows[]>(firstLevelNodes);
  useEffect(() => {
    setData(firstLevelNodes);
  }, [firstLevelNodes]);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: (row) => row.original.type === 'DIRECTORY',
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <table className={styles.table} cellSpacing={0}>
      <thead className={styles.header}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  style={{ width: `calc(${header.column.getSize()}%)` }}
                  className={styles.headerCell}
                  key={header.id}
                  colSpan={header.colSpan}
                >
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
        {table.getRowModel().rows.map((row) => {
          return (
            <tr
              className={styles.tableRow}
              key={row.id}
              onClick={async () => {
                if (!row.original.subRows) {
                  const subRows = await FileSystemNodeService.findNodesByParentId({ parentId: row.original._id });
                  console.log(data.map((row1) => (row1._id === row.original._id ? { ...row1, subRows } : row1)));
                  setData((prevData) => {
                    const updated = updateNode(prevData, row.original._id, { subRows });
                    console.log(updated);
                    return updated;
                  });
                }
                row.getToggleExpandedHandler()();
              }}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td className={styles.cell} style={{ width: `calc(${cell.column.getSize()}%)` }} key={cell.id}>
                    <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
