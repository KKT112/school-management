import MenuButton from "./mobileview-button/menu-button";
import OutletComponent from "./outlet-componetn/outlet-component";
import Sidebar from "./sidebar/sidebar";

const SchoolDashboard = () => {
  return (
    <div className="flex flex-row ">
      <Sidebar/>
      <MenuButton/>
      <OutletComponent/>
    </div>
  )
}

export default SchoolDashboard;
