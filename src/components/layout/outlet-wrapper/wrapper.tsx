import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import Header from "@/components/header/header";

const OutLetWraper = () => {
  return (
    <div>
    <Header/>
    <div className="flex flex-col md:flex-row pt-5 md:pt-0 ">
      <Sidebar />
      <div className=" text-center  md:flex-1 mt-20">
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default OutLetWraper;
