/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface IUserModel {
  name: string;
  address: string;
  age: number;
  email: string;
}

//  Create Zod schema
const studentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Age must be a valid number",
    }),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

const OutletStudent = () => {
  const initialUsers: IUserModel[] = [
    {
      name: "Nayan",
      address: "Surendarnagar",
      age: 21,
      email: "nayan@gmail.com",
    },
    {
      name: "Kuldeep",
      address: "Junagadha",
      age: 21,
      email: "kuldeep@gmail.com",
    },
  ];

  const [user, setUsers] = useState<IUserModel[]>(initialUsers);
  const [studentDetail, setStudentDetail] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //  Use the form hook
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
    },
  });

  // Submit Handler
  const onSubmit = (data: StudentFormValues) => {
    const newUser: IUserModel = {
      name: data.name,
      email: data.email,
      age: parseInt(data.age),
      address: "",
    };

    setUsers([...user, newUser]);
    form.reset();
    setStudentDetail(false);
  };

  const handleDelete = (userToDelete: IUserModel) => {
    const updatedUsers = user.filter((u) => u.email !== userToDelete.email);
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
        data={user}
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
          { accessorKey: "name", header: "Name" },
          { accessorKey: "email", header: "Email" },
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

      {/*  Dialog + Zod Form */}
      <Dialog open={studentDetail} onOpenChange={setStudentDetail}>
        <DialogContent onInteractOutside={() => setStudentDetail(false)}>
          <DialogHeader>
            <DialogTitle>Add Student Detail</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Student name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Enter Student email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Enter Student age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={() => setStudentDetail(false)}>
                  Close
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OutletStudent;
