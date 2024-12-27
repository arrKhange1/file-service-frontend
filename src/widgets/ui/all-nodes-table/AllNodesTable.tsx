import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { HTMLProps, useEffect, useState } from 'react';
import { FileSystemNode, FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { useQuery } from '@tanstack/react-query';
import { getCustomExpandedRowModel } from './CustomExpandedRowModel';
import { HttpStatusCode } from 'axios';

interface AllNodeTableProps {
  firstLevelNodes: FileSystemNodeWithSubRows[];
  rootLevelId: string;
}

interface FileSystemNodeWithSubRows extends FileSystemNode {
  subRows?: FileSystemNodeWithSubRows[];
}

////

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
  mutateFn: (rows: FileSystemNodeWithSubRows[], id: string) => FileSystemNodeWithSubRows[],
): FileSystemNodeWithSubRows[] {
  function nodeUpdater(rows: FileSystemNodeWithSubRows[]): FileSystemNodeWithSubRows[] {
    if (!oldData.length) return [];
    if (rows.some((row) => row._id === id)) return mutateFn(rows, id);
    return rows.map((row) => (row.subRows ? { ...row, subRows: nodeUpdater(row.subRows) } : row));
  }

  return nodeUpdater(oldData);
}

// function updateNode(
//   oldData: FileSystemNodeWithSubRows[],
//   id: string,
//   nodeUpdate: Partial<FileSystemNodeWithSubRows>,
// ): FileSystemNodeWithSubRows[] {
//   function nodeUpdater(rows: FileSystemNodeWithSubRows[]): FileSystemNodeWithSubRows[] {
//     if (!oldData.length) return [];
//     if (rows.some((row) => row._id === id))
//       return rows.map((row) => (row._id === id ? { ...row, ...nodeUpdate } : row));
//     return rows.map((row) => (row.subRows ? { ...row, subRows: nodeUpdater(row.subRows) } : row));
//   }

//   return nodeUpdater(oldData);
// }

///

export const AllNodesTable = ({ firstLevelNodes }: AllNodeTableProps) => {
  const columns = React.useMemo<ColumnDef<FileSystemNodeWithSubRows>[]>(
    () => [
      {
        id: '1',
        accessorFn: (row) => row.name,
        header: ({ table }) => (
          <>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />{' '}
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? '👇' : '👉'}
            </button>{' '}
            Name
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <div>
              <button
                onClick={async () => {
                  const status = await FileSystemNodeService.deleteNodeById({ id: row.original._id });
                  if (200 === status) setData((prevData) => deleteNode(prevData, row.original._id));
                }}
              >
                Delete
              </button>
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />{' '}
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: async () => {
                      if (!row.original.subRows) {
                        const subRows = await FileSystemNodeService.findNodesByParentId({ parentId: row.original._id });
                        console.log(data.map((row1) => (row1._id === row.original._id ? { ...row1, subRows } : row1)));
                        setData((prevData) => updateNode(prevData, row.original._id, { subRows }));
                      }
                      row.getToggleExpandedHandler()();
                    },
                    style: { cursor: 'pointer' },
                  }}
                >
                  {row.getIsExpanded() ? '👇' : '👉'}
                </button>
              ) : (
                '🔵'
              )}{' '}
              {getValue<boolean>()}
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
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
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getExpandedRowModel: getCustomExpandedRowModel(),
    // manualExpanding: true,
    getExpandedRowModel: getExpandedRowModel(),
    // filterFromLeafRows: true,
    // maxLeafRowFilterDepth: 0,
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />;
}
