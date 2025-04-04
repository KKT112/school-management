
class ApiSchoolServer{
    public schoolManagementApi = "https://api-school-management.devkrest.com/api/auth"
}

class ApiEndPoints{

    public baseUrl:string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(server:any) {
        this.baseUrl = server.baseUrl;
    }

    //allend points 


    //for logindata
    public login = "/login";

    //for registration 
    public registration = "/register-school";

    //api for getallschoollist

    public getAllSchoolname = "";


}

 export const apiEndPoints = new ApiEndPoints(new ApiSchoolServer);
