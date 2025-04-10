import { ISubjectModel } from "../../../model/subject-model"
import { apiEndPoints } from "@/network/api-end-points"
import { API_GET } from "@/network/api-service"

export default class apiSubjectList  {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getSubjectList = async({school_id }:any)=>{
        const res = await API_GET<ISubjectModel[]>({
            url : apiEndPoints.getSubjectList,
            params : {school_id}
        })

        return res;
    }
}