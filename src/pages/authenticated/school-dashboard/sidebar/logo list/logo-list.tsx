import { homeLogo } from "@/lib/logoes";

const LogoListSidebar = () => {
  return (
    <div className="flex flex-col  pt-10 pb-10  h-full justify-between">
      <div className="flex flex-col gap-5">

        <div className=" flex justify-center pt-2 pb-2">
          <img src={homeLogo} alt="" className="md:h-12 sm:h-8 h-8" />
        </div>

        <div className="flex flex-col  items-center gap-5">
          <p className="cursor-pointer">Dashboard</p>
          <p className="cursor-pointer">Subject</p>
          <p className="cursor-pointer">Teacher</p>
          <p className="cursor-pointer">Student</p>
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
