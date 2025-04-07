"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { flexRender } from "@tanstack/react-table";
import { Skeleton } from "../ui/skeleton";
import { Loader2 } from "lucide-react";

function CommonTable({
  table,
  isLoading,
  columns,
}: {
  table: any;
  isLoading: boolean;
  columns: any[];
}) {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Table className="block flex-1 h-full max-h-[70vh] rounded-md relative w-full ">
        {table.getHeaderGroups().map((headerGroup: any) => (
          <TableRow key={headerGroup.id} className="flex w-full  items-center">
            {headerGroup.headers.map((header: any) => {
              return (
                <TableHead
                  className="bg-card  dark:bg-card items-center last:flex-1 flex last:justify-end "
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}

        <TableBody className="rounded-md border-0  w-full flex flex-col ">
          {isLoading ? (
            <Skeleton className=" flex items-center justify-center h-[50vh]">
              <Loader2 className="block w-8 h-8 border-0 animate-spin" />
            </Skeleton>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="flex-1 flex "
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell
                    className="  last:flex-1 last:flex last:justify-end dark:bg-black bg-white"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="block  border-0">
              <TableCell
                colSpan={columns.length}
                className="w-[calc(100vw-250px)] h-24 text-center border-0"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CommonTable;
