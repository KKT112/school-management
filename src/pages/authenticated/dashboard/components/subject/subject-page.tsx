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
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ISubjectModel {
  name: string;
  teacherName: string;
  email: string;
}

const subjects: ISubjectModel[] = [
  { name: "Physics", teacherName: "john", email: "john@gmail.com" },
  { name: "English", teacherName: "thomas", email: "thomas@gmail.com" },
  { name: "Maths", teacherName: "Abc", email: "Abc@gmail.com" },
];

// Zod schema
const subjectFormSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  teacherName: z.string().min(1, "Faculty name is required"),
  email: z.string().email("Enter a valid email"),
});

type SubjectFormType = z.infer<typeof subjectFormSchema>;

const OutletSubject = () => {
  const [subjectArr, setSubjectArr] = useState<ISubjectModel[]>(subjects);
  const [openAddSubject, setOpenAddSubject] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SubjectFormType>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      name: "",
      teacherName: "",
      email: "",
    },
  });

  const onSubmit = (data: SubjectFormType) => {
    const newSubject: ISubjectModel = {
      name: data.name,
      teacherName: data.teacherName,
      email: data.email,
    };

    setSubjectArr([...subjectArr, newSubject]);
    form.reset();
    setOpenAddSubject(false);
  };

  const handleDelete = (subjectToDelete: ISubjectModel) => {
    const updatedSubjects = subjectArr.filter(
      (subject) => subject.email !== subjectToDelete.email
    );
    setSubjectArr(updatedSubjects);
  };

  return (
    <div className="pt-20">
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

      <div className="pt-20" />

      <DataTable<ISubjectModel>
        actionButton={
          <Button onClick={() => setOpenAddSubject(true)}>Add Subject</Button>
        }
        enableFilter={true}
        searchValue={[search]}
        onSearchChange={(e: any) => setSearch(e.target.value)}
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
            cell: ({ row }) => (
              <div>
                <p className="text-start">{row.original.email}</p>
              </div>
            ),
          },
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
              const subject = row.original;
              return (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-red-600 hover:bg-red-100 text-red-400"
                    onClick={() => handleDelete(subject)}
                  >
                    Delete
                  </Button>
                </div>
              );
            },
          },
        ]}
      />

      {/* Dialog with form */}
      <Dialog open={openAddSubject} onOpenChange={setOpenAddSubject}>
        <DialogContent onInteractOutside={() => setOpenAddSubject(false)}>
          <DialogHeader>
            <DialogTitle>Add Subject</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Subject name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teacherName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Faculty Name" {...field} />
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
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={() => setOpenAddSubject(false)}>
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

export default OutletSubject;
