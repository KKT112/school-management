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
import { ITeacherModel } from "@/model/school-register/teacher-model";
import TeacherContextProvider, { useContextProvider } from "./cntx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApiTeacherCreate, { ITeacherAdd } from "@/network/api/api-techer/api-create-teacher";

//  Create Zod schema
const teacherFormSchema = z.object({
  
  teacher_name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "email is required" }),
  password:z.string().min(3,{message:"Enter Your Password"}),
  status_label: z.enum(["Active","UnActive"], {
    message: "Please select a Status name",
  }),
});

type StudentFormValues = z.infer<typeof teacherFormSchema>;

function OutletTeacher() {
  return (
    <TeacherContextProvider>
      <TeacherPage />
    </TeacherContextProvider>
  );
}


const TeacherPage = () => {
  const [tecaherDetail, setTeacherDetail] = useState(false);
  const [search, setSearch] = useState("");
  const { isLoading, teacher,school_id,fetchTeachers,  } = useContextProvider();

  
  
const techerAdd = async (data: ITeacherAdd) => {
  const res = await ApiTeacherCreate.ApiCreateTeacher(data);
  console.log("api response",res.m);

  if(res.m === "Success"){
    await fetchTeachers(); 
    console.log(fetchTeachers());
    setTeacherDetail(false); 
    form.reset(); 
  }
};

  //
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      teacher_name: "",
      email: "",
    },
  });

  // Submit Handler
  const onSubmit = (data: StudentFormValues) => {
    console.log("Form submitted with data: ", data);
    techerAdd({...data,school_id });
   
  };

  // function handleDelete(teacher_name){

  // }

  return (
    <div className="pt-20">
      <DataTable<ITeacherModel>
        actionButton={
          <div>
            {
              <Button onClick={() => setTeacherDetail(true)}>
                Add Teacher Detail
              </Button>
            }
          </div>
        }
        enableFilter={false}
        searchValue={[search]}
        onSearchChange={(e: any) => setSearch(e.target.value)}
        isFetching={isLoading}
        isLoading={isLoading}
        data={teacher}
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
          { accessorKey: "status_label", header: "Status" },
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
              return (
                // <div className="flex gap-2">
                //    <Button
                //     variant="outline"
                //     className="border-red-600 hover:bg-red-100 text-red-400"
                //     onClick={() => handleDelete(teacher_name)}
                //   >
                //     Delete
                //   </Button> 
                // </div>
                <></>
              );
            },
          },
        ]}
      />

      {/* zod*/}
      <Dialog open={tecaherDetail} onOpenChange={setTeacherDetail}>
        <DialogContent onInteractOutside={() => setTeacherDetail(false)}>
          <DialogHeader>
            <DialogTitle>Add Teacher Detail</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="teacher_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Teacher name" {...field} />
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
                      <Input
                        type="email"
                        placeholder="Enter Teacher email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                 <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Your Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="status_label"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-200">
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="UnActive">UnActive</SelectItem>
                    
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={() => setTeacherDetail(false)}>
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

export default OutletTeacher;
