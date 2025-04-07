import { schoolIcon } from "@/lib/logoes";
import { useNavigate } from "react-router-dom";
import { PiStudent } from "react-icons/pi";
import { LuNotebookText } from "react-icons/lu";
import { GiTeacher } from "react-icons/gi";
import { MdSettingsApplications } from "react-icons/md";
import { LogoutAlert } from "@/pages/authenticated/dashboard/components/logout-alert/logout-alert";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { FiBookOpen } from "react-icons/fi";



const LogoListSidebar = () => {
  const navigate = useNavigate();
  const schoolName = useSelector((state: RootState) => state.school.name);

  return (
    <div className="flex flex-col  pt-10 pb-10  h-full justify-between ">
      <div className="flex flex-col gap-5 ">
        <div className=" md:hidden flex justify-center pt-2 pb-2">
        <div className="flex flex-col gap-3 items-center ">
              <img src={schoolIcon} className="h-6" />
              <p className="text-sm font-semibold">{schoolName}</p>
            </div>
        </div>

        <div className="flex flex-col  items-center gap-5 ">
          {/* <p className="font-bold text-md md:text-xl underline text-blue-500 md:hidden">Menu</p> */}
          <div className=" flex items-center gap-2 hover:bg-white px-10 py-2 rounded-md cursor-pointer">
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
          <div className="flex items-center gap-2 hover:bg-white px-10 py-2 rounded-md cursor-pointer">
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
          <div className="flex items-center gap-2  hover:bg-white px-10 py-2 rounded-md cursor-pointer">
            {" "}
            <PiStudent size={20} />{" "}
            <p
              className="cursor-pointer "
              onClick={() => {
                navigate("/student");
              }}
            >
              Student
            </p>
          </div>

          <div className="flex items-center gap-2  hover:bg-white px-10 py-2 rounded-md cursor-pointer">
            {" "}
            <FiBookOpen size={20}/>{" "}
            <p
              className="cursor-pointer "
              onClick={() => {
                navigate("/standard");
              }}
            >
              Standard
            </p>
          </div>

        </div>

        <div className="flex flex-col  items-center gap-5 pt-50">
          <div className="flex items-center gap-2  hover:bg-white px-10 py-2 rounded-md cursor-pointer">
            <MdSettingsApplications size={25} />
            <p className="">Setting</p>
          </div>

          <LogoutAlert />
        </div>
      </div>
    </div>
  );
};

export default LogoListSidebar;
