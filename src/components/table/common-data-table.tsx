"use client";
import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  Table,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CommonTable from "./common-table";
import CommonPagination from "./common-pagination";
import CommonColumn, { CommonColumnProps } from "./common-column";
interface DataTableProps<TData> {
  columns: CommonColumnProps<TData>[];
  data: TData[];
  tableToolbar?: (table: Table<TData>) => React.ReactElement;
  updateToolBarProps?: any;
}
interface Props {
  callToNextPage: (index: number) => void;
  autoResetPageIndex: boolean;
  isLoading: boolean;
  getData: (skip: number) => void;
}
export function CommonDataTable<TData>({
  columns,
  data,
  callToNextPage,
  autoResetPageIndex,
  isLoading,
  tableToolbar,
  updateToolBarProps = [],
}: DataTableProps<TData> & Props) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const v = CommonColumn<(typeof data)[number]>(columns);
  const table = useReactTable({
    autoResetPageIndex: false,
    data,
    columns: v,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const toolBar = React.useMemo(() => {
    return tableToolbar ? tableToolbar(table) : <></>;
  }, updateToolBarProps);
  React.useEffect(() => {
    if (autoResetPageIndex) {
      table.setPageIndex(0);
    }
  }, [autoResetPageIndex]);
  return (
    <div className="w-full">
      {toolBar}
      <CommonTable columns={columns} isLoading={isLoading} table={table} />
      <CommonPagination table={table} callToNextPage={callToNextPage} />
    </div>
  );
}
