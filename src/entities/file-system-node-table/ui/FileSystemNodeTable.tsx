import React, { ReactNode, useEffect } from 'react';
import { ColumnDef, useReactTable, getCoreRowModel, getExpandedRowModel, Row } from '@tanstack/react-table';
import { DirectoryIcon } from '../../../shared/icons/DirectoryIcon';
import { FileIcon } from '../../../shared/icons/FileIcon';
import { Table } from '../../../shared/ui/table/Table';
import { FileSystemNode, FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';

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
  );
};
