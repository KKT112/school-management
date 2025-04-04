import { Outlet } from "react-router-dom";
import MenuButton from "./mobileview-button/menu-button";
import Sidebar from "./sidebar/sidebar";

const OutLetWraper = () => {
  return (
    <div className="flex flex-row ">
      <Sidebar />
      <MenuButton />
      <div className="bg-amber-500 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default OutLetWraper;
