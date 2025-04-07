"use client";
import { Funnel, X } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { Table } from "@tanstack/react-table";
import { ChangeEventHandler } from "react";


interface DataTableToolbarProps {
  table: Table<any>;
  search?: string;
  onSearchChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  enableSearchField?: boolean;
  enableViewFilter?: boolean;
  enableFilter?: boolean;
  onFilterClick?: () => void;
  actionButton?: ReactNode;
}
export function DataTableToolbar({
  table,
  search,
  onSearchChange,
  enableSearchField = true,
  enableViewFilter = false,
  enableFilter = false,
  onFilterClick,
  actionButton,
}: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    table.getColumn("title")?.setFilterValue(value);
  };
  const statusColumn = table.getColumn("status");
  const priorityColumn = table.getColumn("priority");

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      {enableSearchField && (
        <Input
          placeholder="Search"
          value={search}
          onChange={onSearchChange}
          className="h-8 min-w-[200px] max-w-sm"
        />
      )}

      {/* {statusColumn && (
        <DataTableFacetedFilter
          column={statusColumn}
          title="Status"
          options={statuses}
        />
      )}
      {priorityColumn && (
        <DataTableFacetedFilter
          column={priorityColumn}
          title="Priority"
          options={priorities}
        />
      )} */}

      {isFiltered && (
        <Button
          variant="outline"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      )}

      {enableViewFilter && <DataTableViewOptions table={table} />}
      {enableFilter && (
        <Button
          size="sm"
          variant={"outline"}
          color="dark"
          onClick={onFilterClick}
          className="ltr:ml-2 rtl:mr-2  h-8 "
        >
          <div className="relative">
            <Funnel className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
            <div className="h-2 w-2 bg-primary absolute -top-1 right-1 rounded-full"></div>
          </div>
          Filter
        </Button>
      )}
      {actionButton}
    </div>
  );
}
