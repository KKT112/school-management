"use client"
import { CgMenu } from "react-icons/cg";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import LogoListSidebar from "../sidebar/logo list/logo-list";

const MenuButton = () => {
  return (
    <div className="sm:hidden ">
 
      <Sheet >
        <SheetTrigger className="">
        <CgMenu className="cursor-pointer text-3xl" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[50%]">
          
          <LogoListSidebar/>

        </SheetContent>
      </Sheet>
  </div>
  )
}

export default MenuButton
