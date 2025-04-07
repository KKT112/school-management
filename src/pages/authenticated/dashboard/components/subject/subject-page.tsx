/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ISubjectModel {
  name: string;
  teacherName: string;
  email: string;
}

const subjects: ISubjectModel[] = [
  {
    name: "Physics",
    teacherName: "john",
    email: "john@gmail.com",
  },
  {
    name: "English",
    teacherName: "thomas",
    email: "thomas@gmail.com",
  },
  {
    name: "Maths",
    teacherName: "Abc",
    email: "Abc@gmail.com",
  },
];




const OutletSubject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openAddSubject, setOpenAddSubject] = useState(false);
  const [search, setSearch] = useState("");
  const [subjectArr,setSubjectArr] = useState<ISubjectModel[]>(subjects);

  const [newTeacherName, setNewTeacherName] = useState("");
const [newEmail, setNewEmail] = useState("");
const [newname, setNewname] = useState("");


const handleAddSubject = () => {
  if (!newTeacherName || !newEmail || !newname) return;

  const newSubjectAdd: ISubjectModel = {
    name: newname,
    email: newEmail,
    teacherName:newTeacherName ,
  };

  setSubjectArr([...subjectArr, newSubjectAdd]);
  setOpenAddSubject(false);

  // Clear input fields
  setNewname("");
  setNewEmail("");
  setNewTeacherName("");
};
 // Delete user
 const handleDelete = (userToDelete: ISubjectModel) => {
  const updatedSubjects = subjects.filter(subject =>subject.email !== userToDelete.email);
  setSubjectArr(updatedSubjects);
};

  return (
    <div className="pt-20 ">
      <div className="flex mx-15 items-center gap-10">
        <p>Select Standard*</p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Std-1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="std-1">Std-1</SelectItem>
            <SelectItem value="std-2">Std-2</SelectItem>
            <SelectItem value="std-3">Std-3</SelectItem>
            <SelectItem value="std-4">Std-4</SelectItem>
            <SelectItem value="std-5">Std-5</SelectItem>
            <SelectItem value="std-6">Std-6</SelectItem>
          </SelectContent>
        </Select>
      </div>
  <div className="pt-20"></div>
      <DataTable<ISubjectModel> 
        // onFilterClick={() => {
        //   setFilterSheetOpen(true);
        // }}
        actionButton={
          <Button onClick={() => setOpenAddSubject(true)}>Add Subject</Button>
        }
        enableFilter={true}
        searchValue={[search]}
        // callToNextPage={(currentPage, size) => {
        //   if ((currentPage + 1) * size >= (totalData?.length ?? 0)) {
        //     // setSkip(totalData?.length ?? 0);
        //     fetchNextPage();
        //   }
        // }}
        onSearchChange={(e: any) => {
          setSearch(e.target.value);
        }}
        isFetching={isLoading}
        isLoading={isLoading}
        data={subjectArr ?? []}
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
            header: "Subject Name",
          },
          {
            accessorKey: "teacherName",
            header: "Faculty Name",
          },
          {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => {
              return (
                <div>
                  <p className="text-start">{row.original.email}</p>
                </div>
              );
            },
          },
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
              const user = row.original;

              return (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-red-600 hover:bg-red-100 text-red-400"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </Button>
                </div>
              );
            },
          },
        ]}
      />

<Dialog open={openAddSubject}>
        <DialogContent
        onInteractOutside={()=>setOpenAddSubject(false)}
        >
          <DialogHeader>
            <DialogTitle>Add Subject</DialogTitle>

            <div>
             <p className="mt-7 pb-2">Subject Name </p> <Input placeholder="Enter Subject name" />
             <p className=" pt-5 pb-2">Faculty Name</p> <Input type="text" placeholder="Enter Faculty Name"/>
             <p className="pt-5 pb-2">Email</p> <Input type="email" placeholder="Enter email  "/>
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
