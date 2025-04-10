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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ITeacherModel } from "@/model/school-register/teacher-model";
import TeacherContextProvider, { useContextProvider } from "../teacheroutlet/cntx";
import { IStandardModel } from "@/model/standard-model";
// import ApiTeacherCreate, { ITeacherAdd } from "@/network/api/api-techer/api-create-teacher";

function StandardPageOutlet() {
  return (
    <TeacherContextProvider>
      <StandardPage/>
    </TeacherContextProvider>
  );
}


const StandardPage = () => {
  const { isLoading, teacher,fetchTeachers } = useContextProvider();
  const teceherIds  = teacher.map((v)=>String(v.id));

  const formSchemaAddStandard = z.object({
    standard: z
      .string({ required_error: "This is Required", message: "" })
      .min(1, { message: "Standard must be at least 1 character long" })
      .max(4, { message: "Standard must be at most 4 characters long" }),
    division: z
      .string({ required_error: "This is Required" })
      .min(1, { message: "division must be at least 1 characters long" })
      .max(4, { message: "division be at most 4 characters long" }),
    techerList: z
    .string().refine((v)=>teceherIds.includes(v))
  });

  type StudentFormValues = z.infer<typeof formSchemaAddStandard>;

  
  const [tecaherDetail, setTeacherDetail] = useState(false);
  const [search, setSearch] = useState("");
  

  

  
  
// const techerAdd = async (data: ITeacherAdd) => {
//   const res = await ApiTeacherCreate.ApiCreateTeacher(data);
//   console.log("api response",res.m);

  // if(res.m === "Success"){
    
  //   console.log(fetchTeachers());
   
  // }


  //
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchemaAddStandard),
    defaultValues: {
      standard: "",
      division: "",
    },
  });

  // Submit Handler
  const onSubmit = (data: StudentFormValues) => {
     console.log("Form submitted with data: ", data);
    setTeacherDetail(true);
    fetchTeachers(); 
    setTeacherDetail(false); 
    form.reset(); 
    // techerAdd({...data,school_id });
  };



  return (
    <div className="pt-20">
      <DataTable<IStandardModel>
        actionButton={
          <div>
            {
              <Button onClick={() => setTeacherDetail(true)}>
                Add Standard Data
              </Button>
            }
          </div>
        }
        enableFilter={false}
        searchValue={[search]}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

          { accessorKey: "standard", header: "Standard" },
          { accessorKey: "division", header: "Division" },
           { accessorKey: "TeacherList", header: "TeacherList" },
          {
            id: "action",
            header: "Action",
            cell: ({ row }) => {<>{row}</>
            },
          },
        ]}
      />

      {/* zod*/}
      <Dialog open={tecaherDetail} onOpenChange={setTeacherDetail}>
        <DialogContent onInteractOutside={() => setTeacherDetail(false)}>
          <DialogHeader>
            <DialogTitle>Add Standard Data</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="standard"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Your Standard" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Your Division"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
               <FormField
                control={form.control}
                name="techerList"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="TeacherList" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-200">
                     {
                      teacher.map((v,i)=>
                      <SelectItem value={`${v.id}`} key={i}>{[...v.name]}</SelectItem>)
                     }
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





export default StandardPageOutlet;
