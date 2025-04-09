import {apiEndPoints} from "@/network/api-end-points"
import { API_POST } from "@/network/api-service"

export interface ITeacherAdd {
    school_id?:number,
    teacher_name:string,
    email:string,
    password:string, 
}

export default class ApiTeacherCreate {
    static ApiCreateTeacher = async(data : ITeacherAdd)=>{
        const res = await API_POST({
            url : apiEndPoints.createTeacherList,
            data : data,
        });

        return res;
    }
};