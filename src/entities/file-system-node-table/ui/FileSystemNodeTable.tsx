import React, { useCallback } from 'react';
import { ColumnDef, useReactTable, getCoreRowModel, getExpandedRowModel, Row } from '@tanstack/react-table';
import { DirectoryIcon } from '../../../shared/icons/DirectoryIcon';
import { FileIcon } from '../../../shared/icons/FileIcon';
import { Table } from '../../../shared/ui/table/Table';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { useFileSystemNodes } from '../model/file-system-nodes-context';

interface FileSystemNodeTableProps {
  onDirectoryRowClick?: (row: Row<FileSystemNodeWithSubRows>) => void;
  onFileRowClick?: (row: Row<FileSystemNodeWithSubRows>) => void;
  onDirectoryRowSelect?: (row: Row<FileSystemNodeWithSubRows>) => void;
  onFileRowSelect?: (row: Row<FileSystemNodeWithSubRows>) => void;
  allowSelection?: boolean;
}

export const FileSystemNodeTable: React.FC<FileSystemNodeTableProps> = ({
  onDirectoryRowClick,
  onDirectoryRowSelect,
  onFileRowClick,
  onFileRowSelect,
  allowSelection = false,
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

  const onRowClick = useCallback((row: Row<FileSystemNodeWithSubRows>) => {
    if (row.original.type === 'DIRECTORY' && onDirectoryRowClick) onDirectoryRowClick(row);
    if (row.original.type === 'FILE' && onFileRowClick) onFileRowClick(row);
  }, []);

  const onRowSelect = useCallback((row: Row<FileSystemNodeWithSubRows>) => {
    if (row.original.type === 'DIRECTORY' && onDirectoryRowSelect) onDirectoryRowSelect(row);
    if (row.original.type === 'FILE' && onFileRowSelect) onFileRowSelect(row);
  }, []);

  const {
    state: { data },
  } = useFileSystemNodes();
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
      onRowClick={onRowClick}
      onRowSelect={onRowSelect}
      allowSelection={allowSelection}
      selectRowFn={(row, selectedRow) => row.original._id === selectedRow?.original._id}
    />
  );
};
