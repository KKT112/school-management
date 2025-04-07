import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MenuButton from "../layout/outlet-wrapper/mobileview-button/menu-button";
import { homeLogo, schoolIcon } from "@/lib/logoes";

const Header = () => {
  const schoolName = useSelector((state: RootState) => state.school.name);

  return (
    <div className="bg-white shadow-md py-3 items-center justify-between px-10 flex">
      <MenuButton />
      <img src={homeLogo} alt="" className=" md:h-10 sm:h-8 h-8" />

      <div className="hidden md:visible md:flex gap-3 items-center">
    
       
        <img src={schoolIcon} className="h-10" />
        <p className="text-lg font-semibold">{schoolName}</p>
      </div>
    </div>
  );
};

export default Header;

