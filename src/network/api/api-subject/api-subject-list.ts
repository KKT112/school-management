import { ISubjectModel } from "@/model/school-register/subject-model"
import { apiEndPoints } from "@/network/api-end-points"
import { API_GET } from "@/network/api-service"

export default class apiSubjectList  {

    static getSubjectList = async({school_id }:any)=>{
        const res = await API_GET<ISubjectModel[]>({
            url : apiEndPoints.getSubjectList,
            params : {school_id}
        })

        return res;
    }
}