import React, { ReactNode, useEffect } from 'react';
import { FileSystemNode, FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { ColumnDef, useReactTable, getCoreRowModel, getExpandedRowModel, Row } from '@tanstack/react-table';
import { DirectoryIcon } from '../../../shared/icons/DirectoryIcon';
import { FileIcon } from '../../../shared/icons/FileIcon';
import { Table } from '../../../shared/ui/table/Table';
import { FileSystemNodeWithSubRows } from '../model/file-system-node-subrows';

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

interface FileSystemNodeTableProps {
  rootData: FileSystemNode[];
  renderCustomDirectoryRow?: (
    row: Row<FileSystemNodeWithSubRows>,
    children: ReactNode,
    setRows: React.Dispatch<React.SetStateAction<FileSystemNodeWithSubRows[]>>,
  ) => ReactNode;
  renderCustomFileRow?: (
    row: Row<FileSystemNodeWithSubRows>,
    children: ReactNode,
    setRows: React.Dispatch<React.SetStateAction<FileSystemNodeWithSubRows[]>>,
  ) => ReactNode;
}

export const FileSystemNodeTable: React.FC<FileSystemNodeTableProps> = ({
  rootData,
  renderCustomDirectoryRow,
  renderCustomFileRow,
}) => {
  const columns = React.useMemo<ColumnDef<FileSystemNodeWithSubRows>[]>(
    () => [
      {
        id: '1',
        size: 40,
        accessorFn: (row) => row.name,
        header: () => <span>Name</span>,
        cell: ({ row, getValue }) => (
          <div style={{ paddingLeft: `${row.depth + 0.5}rem`, display: 'flex', alignItems: 'center', gap: '1em' }}>
            <div>
              {row.getCanExpand() ? (
                <>{row.getIsExpanded() ? <DirectoryIcon isActive={true} /> : <DirectoryIcon isActive={false} />}</>
              ) : (
                <FileIcon />
              )}
            </div>
            <span>{getValue<string>()}</span>
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
        header: () => <span>Type</span>,
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      },
      {
        id: '3',
        size: 30,
        accessorFn: (row) => row.parentId,
        header: () => <span>Parent ID</span>,
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      },
    ],
    [],
  );

  const [data, setData] = React.useState<FileSystemNodeWithSubRows[]>(rootData);
  useEffect(() => {
    setData(rootData);
  }, [rootData]);

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: (row) => row.original.type === 'DIRECTORY',
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <Table
      table={table}
      renderCustomRow={(row: Row<FileSystemNodeWithSubRows>, children: ReactNode) =>
        row.original.type === 'DIRECTORY' && renderCustomDirectoryRow
          ? renderCustomDirectoryRow(row, children, setData)
          : row.original.type === 'FILE' && renderCustomFileRow
            ? renderCustomFileRow(row, children, setData)
            : null
      }
    />
  ); // HOC?
};
