import { apiEndPoints } from "@/network/api-end-points"
import { API_POST } from "@/network/api-service"

export default class apiLogin{

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getLogin = async ({email,password}:any)=>{

    const res = await API_POST<string>({

        url:apiEndPoints.getLogin,
        data:{email,password},
    })
    
    return res;

    }

}