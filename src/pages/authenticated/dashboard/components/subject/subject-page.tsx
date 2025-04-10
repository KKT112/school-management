/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
import apiSubjectList from "@/network/api/api-subject/api-subject-list";
import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
import { ISubjectModel } from "@/model/school-register/subject-model";
import apiTeacherList from "@/network/api/api-techer/api-get-teacher-list";
import apiCreateSubject from "@/network/api/api-subject/api-create-subject";
import { ICreateSubject } from "@/model/school-register/subject-create-model";
import { ITeacherModel } from "@/model/school-register/teacher-model";

const OutletSubject = () => {
  const school = useSelector((state: ReduxState) => state.school);


  // For teacher api use in dropdown
  const [teacherList, setTeacherList] = useState<ITeacherModel[]>([]);

  // teacher api call
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        if (!school?.id) return;
        setIsLoading(true);
        const res = await apiTeacherList.getTeacherList({
          school_id: school.id,
        });

        setTeacherList(res.r ?? []);
      } catch (error) {
        console.error("Fail to get data", error);
      }
    };
    fetchTeacher();
  }, [school?.id]);

  //zod validation for add subject
  const subjectFormSchema = z.object({
    name: z.string().min(1, "Subject name is required"),
    teacher_id: z.string(),
  });
  type SubjectFormType = z.infer<typeof subjectFormSchema>;

  const [subjectArr, setSubjectArr] = useState<ISubjectModel[]>();
  const [openAddSubject, setOpenAddSubject] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //For showing data in table after addsubject api calling
  const [isApiCalling, setIsApiCalling] = useState(false);

  const form = useForm<SubjectFormType>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: SubjectFormType) => {
    const t = { ...data, school_id: school?.id };
    addSubject(t);
    form.reset();
    setOpenAddSubject(false);
  };


  // subject list api
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (!school?.id) return;
        setIsLoading(true);
        const res = await apiSubjectList.getSubjectList({
          school_id: school.id,
        });
        setSubjectArr(res.r || []);
      } catch (error) {
        console.error("Failed to fetch subject list:", error);
      }
      setIsLoading(false);
    };

    fetchSubjects();
  }, [school?.id, isApiCalling]);

  //add subject api
  const addSubject = async (data: ICreateSubject) => {
    try {
      const res = await apiCreateSubject.createSubject(data);
      setIsApiCalling(!isApiCalling);
      return console.log(res.r);
    } catch (error) {
      console.log("Fail to store data", error);
    }
  };
  
  return (
    <div className="pt-20">
      <div className="pt-20" />

      <DataTable<ISubjectModel>
        actionButton={
          <div className="flex items-center gap-5">
            {" "}
            <Button onClick={() => setOpenAddSubject(true)}>Add Subject</Button>
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
            accessorKey: "teacher",
            header: "Faculty Name",
            cell({ row }) {
              return (
                <div className="items-start flex">
                  {row.original.teacher?.name}
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
                      <Input placeholder="Subject Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teacher_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" ">Teacher Name :</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select  Teacher" />
                          <SelectContent>
                            {/* teacher api call  and daynamic data*/}
                            {teacherList.map((p, index) => {
                              return (
                                <SelectItem key={index} value={`${p.id}`}>
                                  {p.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </SelectTrigger>
                      </FormControl>
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
