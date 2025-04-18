import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import Header from "@/components/header/header";

const OutLetWraper = () => {
  return (
    <div>
    <Header/>
    <div className="flex flex-col sm:flex-row">
      <Sidebar />
      <div className=" text-center  md:flex-1  ">
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default OutLetWraper;
