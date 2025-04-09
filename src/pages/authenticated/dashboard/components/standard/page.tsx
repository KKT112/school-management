import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IStandardData} from "./data/standard";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchemaAddStandard } from "./form/schema";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Flip, toast } from "react-toastify";

const StandardPageOutlet = () => {
  //define a form
  const form = useForm<z.infer<typeof formSchemaAddStandard>>({
    resolver: zodResolver(formSchemaAddStandard),
    defaultValues: {
      classTeacher: "",
      classTeacherSubject: "",
      standard: "",
    },
  });

  const data = localStorage.getItem("std")
  const redableData:IStandardData[] = JSON.parse(data)

  //submit handler
  function onSubmit(values: z.infer<typeof formSchemaAddStandard>) {
    // console.log(values)

    const updateData = [...redableData , values];
    localStorage.setItem("std" , JSON.stringify(updateData))
    
    form.reset();
    setOpenAddSubject(false)
  }

  const [isLoading, setIsLoading] = useState(false);
  const [openAddSubject, setOpenAddSubject] = useState(false);
  const [search, setSearch] = useState("");

  
  

  return (
    <div className="pt-20">
      <DataTable<IStandardData>
        // onFilterClick={() => {
        //   setFilterSheetOpen(true);
        // }}
        actionButton={
          <Button
            onClick={() => setOpenAddSubject(true)}
            className="cursor-pointer"
          >
            Add Division
          </Button>
        }
        enableFilter={false}
        searchValue={[search]}
        // callToNextPage={(currentPage, size) => {
        //   if ((currentPage + 1) * size >= (totalData?.length ?? 0)) {
        //     // setSkip(totalData?.length ?? 0);
        //     fetchNextPage();
        //   }
        // }}

        onSearchChange={(e : any) => {
          setSearch(e.target.value);
        }}
        // isFetching={isLoading}
        isLoading={isLoading}
        data={redableData ?? []}
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
          { header: "Standard", accessorKey: "standard" },
          { header: "Class Teacher", accessorKey: "classTeacher" },
          {
            header: "Class Teacher Subject",
            accessorKey: "classTeacherSubject",

            cell: ({ row }) => {
              return (
                <div>
                  <p className="text-start">
                    {row.original.classTeacherSubject}
                  </p>
                </div>
              );
            },
          },

          {
            header: "Delete Division",
            cell: ({row}) => {
              return (
                <div className=" items-start flex">
                  <Button
                    className="cursor-pointer"
                    onClick={() => {

                      const deletedData = redableData.find((p )=>{
                        if(p.standard === row.original.standard){
                          return (
                            p
                          )
                        }
                      })
                      // console.log(deletedData);

                      const newRedebleData = redableData.filter((item)=>{return item.standard != deletedData?.standard})
                      // console.log(newRedebleData)

                      localStorage.setItem("std" , JSON.stringify(newRedebleData))

                      setIsLoading(true)

                      toast.error(`${row.original.standard} Division is Deleting ...`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Flip,
                        
                        });

                      
                      

                      setTimeout(()=>{
                        setIsLoading(false)
                      },3000)
      
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            },
          },
        ]}
      />

      {/* dilof box for add subject */}
      <Dialog open={openAddSubject}>
        <DialogContent
          onInteractOutside={() => setOpenAddSubject(false)}
          onXClick={() => setOpenAddSubject(false)}
        >
          <DialogHeader>
            <DialogTitle className="pb-5">Add Division</DialogTitle>


            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 "
              >
                <div>
                  {/* first input  */}
                  <FormField
                    control={form.control}
                    name="standard"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter Standard" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  {/* second input  */}
                  <FormField
                    control={form.control}
                    name="classTeacher"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter ClassTeacher Name"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  {/* third input  */}
                  <FormField
                    control={form.control}
                    name="classTeacherSubject"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <Input
                            placeholder="Enter ClassTeacherSubject Name"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                    <div className="  flex justify-end gap-8">
                    <Button type="submit" className="cursor-pointer " >
                  Add
                </Button>
                
               
              <Button
                onClick={() => setOpenAddSubject(false)}
                type="button"
                className="cursor-pointer"
              >
                Close
              </Button>
            
                    </div>
                
              </form>
            </Form>

           
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StandardPageOutlet;
