
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


    //for registration 
    public registration = "/register-school";

}

const apiEndPoints = new ApiEndPoints(new ApiSchoolServer());

export default apiEndPoints;
