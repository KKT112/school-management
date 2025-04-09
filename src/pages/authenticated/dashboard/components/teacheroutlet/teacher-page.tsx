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


//  Create Zod schema
const teacherFormSchema = z.object({
  school_id:z.number(),
  teacher_name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "email is required" }),
  status_label: z.string().min(2, { message: "label is required" }),
  password:z.string(),


});

type StudentFormValues = z.infer<typeof teacherFormSchema>;

function OutletTeacher(){
  return(
    <TeacherContextProvider>
    <TeacherPage/>
  </TeacherContextProvider>
  )
 
}



const TeacherPage = () => {
  const [tecaherDetail, setTeacherDetail] = useState(false);
  const [search, setSearch] = useState("");
  const { isLoading, teacher} = useContextProvider();
  


  //  
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      teacher_name: "",
      email: "",
      status_label: "",
    },
  });


  // Submit Handler
  const onSubmit = (data: StudentFormValues) => {
    console.log("Form submitted with data: ", data); 
     setTeacherDetail(false); 
     form.reset(); 
  };
  
  
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
             
                <div className="flex gap-2">
                  {/* <Button
                    variant="outline"
                    className="border-red-600 hover:bg-red-100 text-red-400"
                    onClick={() => handleDelete(teachers)}
                  >
                    Delete
                  </Button> */}
                 
                </div>
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="status_label"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="status_label"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="school_id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter School Id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}  
              /> */}

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
