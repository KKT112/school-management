
import { getTeacherList } from "../../../../../redux/reducer/techer-reducer";
  import  {ReduxState}  from "../../../../../redux/store";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";

  export const useTeacherCtrl = () => {
    const dispatch = useDispatch();
    const {id:school_id}= useSelector((state: ReduxState) => state.school);
    // const{} = useSelector((state:ReduxState)=>state.teacher.teacher)


  

    const fetchTeachers = () => {
       console.log(school_id);
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       dispatch<any>(getTeacherList(school_id));
    };
    
    useEffect(() => {
      fetchTeachers(); // call once initially
    }, [dispatch]);
    

    const { isLoading, teacher } = useSelector(
      (state: ReduxState) => state.teacher
    );

    return {
      isLoading: isLoading,
      teacher: teacher,
      fetchTeachers,
      school_id,
    };
  }