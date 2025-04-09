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
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema
const subjectFormSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  teacherName: z.enum(["john", "thomas", "venom", "abc"], {
    message: "Please select a teacher name",
  }),
});

type SubjectFormType = z.infer<typeof subjectFormSchema>;

interface ISubjectModel {
  name: string;
  teacherName: string;
}

const subjects: ISubjectModel[] = [
  { name: "Physics", teacherName: "john" },
  { name: "English", teacherName: "thomas" },
  { name: "Maths", teacherName: "Venom" },
];

const OutletSubject = () => {
  const [subjectArr, setSubjectArr] = useState<ISubjectModel[]>(subjects);
  const [openAddSubject, setOpenAddSubject] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SubjectFormType>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      name: "",
      teacherName: undefined,
    },
  });

  const onSubmit = (data: SubjectFormType) => {
    const newSubject: ISubjectModel = {
      name: data.name,
      teacherName: data.teacherName,
    };

    setSubjectArr([...subjectArr, newSubject]);
    form.reset();
    setOpenAddSubject(false);
  };

  const handleDelete = (subjectToDelete: ISubjectModel) => {
    const updatedSubjects = subjectArr.filter(
      (subject) => subject !== subjectToDelete
    );
    setSubjectArr(updatedSubjects);
  };

  return (
    <div className="pt-20">
      <div className="pt-20" />

      <DataTable<ISubjectModel>
        actionButton={
          <div className="flex items-center gap-5">
            {" "}
            <Button onClick={() => setOpenAddSubject(true)}>Add Subject</Button>
            <Select>
              <SelectTrigger className="py-6 px-7 text-lg">
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>

              <SelectContent className="bg-gray-200">
                <SelectItem value="john">John</SelectItem>
                <SelectItem value="thomas">Thomas</SelectItem>
                <SelectItem value="venom">Venom</SelectItem>
                <SelectItem value="abc">abc</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                    <FormLabel className=" ">Teacher Name :</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-6 px-7 text-lg">
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-200">
                        <SelectItem value="john">John</SelectItem>
                        <SelectItem value="thomas">Thomas</SelectItem>
                        <SelectItem value="venom">Venom</SelectItem>
                        <SelectItem value="abc">abc</SelectItem>
                      </SelectContent>
                    </Select>
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
