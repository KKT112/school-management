"use client";
import { DataTableColumnHeader } from "./common-column-header";
import { CellContext, ColumnDef, HeaderContext } from "@tanstack/react-table";

export interface CommonColumnProps<T> {
  accessorKey: keyof T;
  title: string;
  headerClassName: string;
  header?: ({ column }: HeaderContext<T, unknown>) => JSX.Element;
  cellComponent: ({ row }: CellContext<T, unknown>) => React.ReactElement;
}
export default function CommonColumn<T>(
  p: CommonColumnProps<T>[]
): ColumnDef<T, any>[] {
  const headers: ColumnDef<T>[] = [];

  for (const {
    accessorKey,
    cellComponent,
    headerClassName,
    title,
    header,
  } of p) {
    headers.push({
      accessorKey: accessorKey,
      header: header
        ? header
        : ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title={title}
              className={headerClassName}
            />
          ),
      cell: cellComponent,
      enableSorting: false,
      enableHiding: false,
    });
  }

  return headers;
}
