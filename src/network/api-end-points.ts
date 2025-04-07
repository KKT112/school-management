
class ApiSchoolServer{
    public baseUrl = "https://api-school-management.devkrest.com/api/auth"
}

class ApiEndPoints{

    public baseUrl:string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(server:any) {
        if(server instanceof ApiSchoolServer){
            this.baseUrl = server.baseUrl;
        }else{
            this.baseUrl = "Oops something went wrong";
        }
    }

    //End points 


    //api logindata
    public getLogin = "/login";

    //api registration 
    public getRegistration = "/register-school";

    //api teacher
    
  
    //api subject


    //

}

 export const apiEndPoints = new ApiEndPoints(new ApiSchoolServer());
