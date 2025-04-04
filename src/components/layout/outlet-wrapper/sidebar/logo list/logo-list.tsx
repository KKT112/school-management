import { homeLogo } from "@/lib/logoes";
import { useNavigate } from "react-router-dom";
import { PiStudent } from "react-icons/pi";
import { LuNotebookText } from "react-icons/lu";
import { GiTeacher } from "react-icons/gi";
import { MdSettingsApplications } from "react-icons/md";
import { LogoutAlert } from "@/pages/authenticated/dashboard/components/logout-alert/logout-alert";

const LogoListSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  pt-10 pb-10  h-full justify-between">
      <div className="flex flex-col gap-5 ">
        <div className=" flex justify-center pt-2 pb-2">
          <img src={homeLogo} alt="" className="md:h-12 sm:h-8 h-8" />
        </div>

        <div className="flex flex-col  items-center gap-5 ">
          <div className="flex items-center gap-2  hover:bg-white px-10 py-2 rounded-full cursor-pointer">
            {" "}
            <LuNotebookText size={20} />{" "}
            <p
              className="cursor-pointer"
              onClick={() => {
                navigate("/subject");
              }}
            >
              Subject
            </p>
          </div>
          <div className="flex items-center gap-2 hover:bg-white px-10 py-2 rounded-full cursor-pointer">
            {" "}
            <GiTeacher size={20} />
            <p
              className="cursor-pointer"
              onClick={() => {
                navigate("/teacher");
              }}
            >
              Teacher
            </p>
          </div>
          <div className="flex items-center gap-2  hover:bg-white px-10 py-2 rounded-full cursor-pointer">
            {" "}
            <PiStudent size={20} />{" "}
            <p
              className="cursor-pointer"
              onClick={() => {
                navigate("/student");
              }}
            >
              Student
            </p>
          </div>
           {/* <div className="flex flex-col  items-center gap-5">
          <Button className="cursor-pointer" onClick={()=>{navigate("/subject")}}>Subject</Button>
          <Button className="cursor-pointer" onClick={()=>{navigate("/teacher")}}>Teacher</Button>
          <Button className="cursor-pointer" onClick={()=>{navigate("/student")}}>Student</Button>
        </div> */}
        </div>

        <div className="flex flex-col  items-center gap-5 pt-50">
          <div className="flex items-center gap-2  hover:bg-white px-10 py-2 rounded-full cursor-pointer">
            <MdSettingsApplications size={25} />
            <p className="">Setting</p>
          </div>
          {/* <div className="flex items-center gap-2">
            <FiLogOut />
            <p className="cursor-pointer">Logout</p>
          </div>
          */}
           <LogoutAlert/>

        
        </div>
      </div>
    </div>
  );
};

export default LogoListSidebar;
