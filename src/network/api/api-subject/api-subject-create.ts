
import { ICreateSubject } from "../../../model/subject-create-model";
import { apiEndPoints } from "@/network/api-end-points";
import { API_POST } from "@/network/api-service";


export default class apiCreateSubject  {

        static createSubject =async(data:ICreateSubject)=>{
            const res = await API_POST({
                url : apiEndPoints.createSubject,
                data : data
            });
            return res
        }
}