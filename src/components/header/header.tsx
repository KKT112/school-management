import { homeLogo, schoolIcon } from "@/lib/logoes"
import MenuButton from "../layout/outlet-wrapper/mobileview-button/menu-button"


const Header = () => {
  return (
    <div className="bg-white shadow-md py-3 items-center justify-between px-10 flex ">
        <MenuButton />
       <div className="">
          <img src={homeLogo} alt="" className="md:h-10 sm:h-8 h-8" />
        </div>
        <div><img src={schoolIcon} className="h-10"/>
        <div></div>
        </div>
       
    </div>
  )
}

export default Header
