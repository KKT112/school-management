
class ApiSchoolServer{
    public baseUrl = "https://api-school-management.devkrest.com/api"
}

class ApiEndPoints{
    [x: string]: string;

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
    public getLogin = "auth/login";

    //api registration 
    public getRegistration = "auth/register-school";

    //api teacher
    public getTeacherlist =`/teacher/get-list`;
  
    //api teacher create

    public createTeacherList = "/teacher/create"


    //  //api subject list
    public getSubjectList = `/subject/get-list`

    //api subject create
    public createSubject = "/subject/create"

}

 export const apiEndPoints = new ApiEndPoints(new ApiSchoolServer());
