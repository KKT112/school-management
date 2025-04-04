import { Button } from "@/components/ui/button";
import { homeLogo } from "@/lib/logoes";
import { LogoutAlert } from "@/pages/authenticated/dashboard/components/logout-alert/logout-alert";

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
          <Button className="cursor-pointer" onClick={()=>{navigate("/subject")}}>Subject</Button>
          <Button className="cursor-pointer" onClick={()=>{navigate("/teacher")}}>Teacher</Button>
          <Button className="cursor-pointer" onClick={()=>{navigate("/student")}}>Student</Button>
        </div>

      </div>
      <div className="flex flex-col  items-center gap-5">
        <Button className="cursor-pointer">Setting</Button>
        <LogoutAlert/>

      </div>
    </div>
  );
};

export default LogoListSidebar;
