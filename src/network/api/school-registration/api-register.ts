import { ISchoolModel} from "@/model/school-register/school-register";
import apiEndPoints from "@/network/api-end-points"
import { API_POST } from "@/network/api-service"

export interface ISchoolRegisterAdd {
    user_name : string ,
    email :string ,
    password : string,
    name :string,
    address : string
}

export default class ApiRegister {
    static postRegistration = async(data : ISchoolRegisterAdd)=>{
        const res = await API_POST<ISchoolModel>({
            url : apiEndPoints.registration ,
            data : data
        });

        return res;
    }
}