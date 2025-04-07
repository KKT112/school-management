"use client";
import * as React from "react";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  InitialTableState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTableToolbar } from "./data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CommonPagination from "./common-pagination";
import { ChangeEventHandler } from "cleave.js/react/props";
import { Skeleton } from "../ui/skeleton";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

interface Props {
  callToNextPage?: (index: number, size: number) => void;
  autoResetPageIndex?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  getData?: (skip: number) => void;
  search?: string;
  onSearchChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  initialTableState?: InitialTableState | undefined;
  searchValue?: any[];
  enableSearchField?: boolean;
  enableViewFilter?: boolean;
  enableFilter?: boolean;
  onFilterClick?: () => void;
  actionButton?: React.ReactNode;
}

export function DataTable<TData>({
  columns,
  data,
  callToNextPage,
  isLoading,
  isFetching,
  search,
  onSearchChange,
  initialTableState,
  searchValue = [],
  enableSearchField = true,
  enableViewFilter = true,
  enableFilter = false,
  onFilterClick,
  actionButton
}: DataTableProps<TData> & Props) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
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
    initialState: initialTableState,
    autoResetPageIndex: false,
  });

  React.useEffect(() => {
    table.setPageIndex(0);
  }, [...searchValue]);

  return (
    <div className="space-y-4 px-20">
      <DataTableToolbar
        actionButton={actionButton}
        table={table}
        search={search}
        onSearchChange={onSearchChange}
        enableSearchField={enableSearchField}
        enableViewFilter={enableViewFilter}
        enableFilter={enableFilter}
        onFilterClick={onFilterClick}
      />

      <div className="rounded-md border overflow-clip">
        <div className="transition-all">
          {isFetching && (
            <Skeleton className="w-full rounded-sm  p-1 px-2 text-[12px] text-black/60">
              Searching...
            </Skeleton>
          )}
        </div>
        <Table className="max-h-[70vh]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ ...getCommonPinningStyles(header.column) }}
                      className="bg-background"
                    >
                      <div
                        className="flex items-center gap-x-1"
                        role="button"
                        onClick={() => {
                          header.column.toggleSorting(
                            header.column.getIsSorted() == "asc"
                          );
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {header.column.getCanSort() &&
                          header.column.getIsSorted() == "desc" && (
                            <ChevronUp size={15} />
                          )}
                        {header.column.getCanSort() &&
                          header.column.getIsSorted() == "asc" && (
                            <ChevronDown size={15} />
                          )}
                        {header.column.getCanSort() &&
                          header.column.getIsSorted() == false && (
                            <ArrowUpDown size={15} />
                          )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="">
                  <Skeleton className="w-full rounded  p-1 px-2 text-black/60 h-32 flex items-center justify-center">
                    Please wait...
                  </Skeleton>
                </td>
              </tr>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ ...getCommonPinningStyles(cell.column) }}
                          className=" text-start"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="">
                      <div className="w-full rounded  p-1 px-2 text-sm text-black/60 flex items-center justify-center h-32">
                        No Result found.
                      </div>
                    </td>
                  </tr>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <CommonPagination table={table} callToNextPage={callToNextPage} />
    </div>
  );
}

const getCommonPinningStyles = (column: Column<any>): React.CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? ""
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
