
import { ITeacherModel } from "@/model/teacher-model";
import { apiEndPoints } from "@/network/api-end-points"
import {  API_GET } from "@/network/api-service"

export default class apiTeacherList{

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getTeacherList = async ({school_id}:any)=>{

    const res = await API_GET<ITeacherModel[]>({

        url:apiEndPoints.getTeacherlist,
        params:{school_id},
    })

    return res;

    }
}


