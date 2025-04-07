import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface IUserModel {
  name: string;
  address: string;
  age: number;
  email: string;
}

const users: IUserModel[] = [
  {
    name: "Nayan",
    address: "Surendarnagar",
    age: 21,
    email: "n@gmail.com",
  },
  {
    name: "Kuldeep",
    address: "Junagadha",
    age: 21,
    email: "k@gmail.com",
  },
];

const OutletSubject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openAddSubject, setOpenAddSubject] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div>
      <DataTable<IUserModel>
        // onFilterClick={() => {
        //   setFilterSheetOpen(true);
        // }}
        actionButton={
          <Button onClick={() => setOpenAddSubject(true)}>Add Subject</Button>
        }
        enableFilter={false}
        searchValue={[search]}
        // callToNextPage={(currentPage, size) => {
        //   if ((currentPage + 1) * size >= (totalData?.length ?? 0)) {
        //     // setSkip(totalData?.length ?? 0);
        //     fetchNextPage();
        //   }
        // }}
        onSearchChange={(e) => {
          setSearch(e.target.value);
        }}
        isFetching={isLoading}
        isLoading={isLoading}
        data={users ?? []}
        initialTableState={{
          columnPinning: { right: ["action"] },
        }}
        columns={[
          {
            accessorKey: "id",
            header: "SR",
            cell({ row }) {
              return row.index + 1;
            },
          },
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
          {
            accessorKey: "age",
            header: "Age",
            cell: ({ row }) => {
              return (
                <div>
                  <p className="text-start">{row.original.age}</p>
                </div>
              );
            },
          },
        ]}
      />

      <Dialog open={openAddSubject}>
        <DialogContent
        onInteractOutside={()=>setOpenAddSubject(false)}
        onXClick={()=>setOpenAddSubject(false)}
        >
          <DialogHeader>
            <DialogTitle>Add Subject</DialogTitle>

            <div>
              <Input placeholder="Enter subject name" />
            </div>

            <DialogFooter>
              <Button>Submit</Button>
              <Button
              onClick={()=>setOpenAddSubject(false)}
              type="button">Close</Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OutletSubject;
