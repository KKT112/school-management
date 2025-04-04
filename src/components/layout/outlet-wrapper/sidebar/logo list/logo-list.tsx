import { homeLogo } from "@/lib/logoes";
import { useNavigate } from "react-router-dom";

const LogoListSidebar = () => {

  const  navigate = useNavigate();

  return (
    <div className="flex flex-col  pt-10 pb-10  h-full justify-between">
      <div className="flex flex-col gap-5">

        <div className=" flex justify-center pt-2 pb-2">
          <img src={homeLogo} alt="" className="md:h-12 sm:h-8 h-8" />
        </div>

        <div className="flex flex-col  items-center gap-5">
          
          <p className="cursor-pointer" onClick={()=>{navigate("/dashboard")}}>Dashboard</p>
          <p className="cursor-pointer" onClick={()=>{navigate("/subject")}}>Subject</p>
          <p className="cursor-pointer" onClick={()=>{navigate("/teacher")}}>Teacher</p>
          <p className="cursor-pointer" onClick={()=>{navigate("/student")}}>Student</p>
        </div>

      </div>

      <div className="flex flex-col  items-center gap-5">
        <p className="cursor-pointer">Setting</p>
        <p className="cursor-pointer">Logout</p>
      </div>
    </div>
  );
};

export default LogoListSidebar;
