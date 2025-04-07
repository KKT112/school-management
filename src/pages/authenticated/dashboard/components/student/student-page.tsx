import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface IUserModel {
  name: string;
  address: string;
  age: number;
  email: string;
}

const OutletStudent = () => {

  const users = [
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

  const [isLoading, setIsLoading] = useState(false);
  const [studentDetail, setStudentDetail] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUsers] = useState<IUserModel[]>(users);



  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAge, setNewAge] = useState("");

  const handleAddUser = () => {
    if (!newName || !newEmail || !newAge) return;

    const newUser: IUserModel = {
      name: newName,
      email: newEmail,
      age: parseInt(newAge),
      address: "",
    };

    setUsers([...user, newUser]);
    setStudentDetail(false);

    // Clear input fields
    setNewName("");
    setNewEmail("");
    setNewAge("");
  };

  // Delete user
  const handleDelete = (userToDelete: IUserModel) => {
    const updatedUsers = users.filter(user => user.email !== userToDelete.email);
    setUsers(updatedUsers);
  };

  return (
    <div className="pt-20">
      <DataTable<IUserModel>
        actionButton={
          <Button onClick={() => setStudentDetail(true)}>Add Student Details</Button>
        }
        enableFilter={false}
        searchValue={[search]}
        onSearchChange={(e: any) => setSearch(e.target.value)}
        isFetching={isLoading}
        isLoading={isLoading}
        data={users}
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
            cell: ({ row }) => <div>{row.original.age}</div>,
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

      <Dialog open={studentDetail} onOpenChange={setStudentDetail}>
        <DialogContent onInteractOutside={() => setStudentDetail(false)}>
          <DialogHeader>
            <DialogTitle>Add Student Detail</DialogTitle>
            <div>
              <p className="mt-7 pb-2">Student Name</p>
              <Input
                placeholder="Enter Student name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <p className="pt-5 pb-2">Student Email</p>
              <Input
                type="email"
                placeholder="Enter Student Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <p className="pt-5 pb-2">Student Age</p>
              <Input
                type="number"
                placeholder="Enter Student age"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleAddUser}>Submit</Button>
              <Button onClick={() => setStudentDetail(false)} type="button">
                Close
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OutletStudent;
