import { useState } from "react";
import { homeLogo } from "@/lib/logoes";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
   const navItems = [
    { name: "Home", path: "/"  },
    { name: "About us", path: "#about-us" },
    { name: "Our Program", path: "#our-program" }
  ];

  return (
    <div className=" flex justify-between items-center px-5 py-4 h-17 bg-white shadow-md fixed top-0 left-0 w-full z-1">
      {/* Logo */}
      <div className="flex items-center gap-10">
        <img src={homeLogo} alt="Logo" className="h-11" />
      </div>
      
      {/* Navigation Links */}
      <ul className="hidden xl:flex gap-10 text-[17px] font-semibold">
        {navItems.map((v, i) => (
          <a href={v.path} key={i} className="flex items-center gap-1 cursor-pointer hover:text-blue-600  hover:scale-125">
            <p>{v.name}</p>
            {/* <IoIosArrowDown /> */}
          </a>
        ))}
      </ul>
      
    
      
      {/* Login/Register Buttons */}
      <div className="hidden xl:flex gap-3">
        <button onClick={()=>navigate("/login")} className="border cursor-pointer hover:text-blue-600 font-semibold border-gray-300 bg-white px-6 py-2 rounded-md ">Log In</button>
        <button onClick={()=>navigate("/register")} className="bg-blue-600  hover:bg-blue-800 cursor-pointer text-white px-8 py-2 rounded-md">Register</button>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="xl:hidden">
        <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
          <FiMenu size={30} className="cursor-pointer" />
        </button>
      </div>
      
      {/* Sidebar Menu */}
      <div className={`fixed top-0 right-0 w-80 z-1 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300  xl:hidden p-5`}>
        <div className="flex justify-between items-center mb-5">
          <img src={homeLogo} alt="logo-error" className="h-11 " />
          <button onClick={() => setIsOpen(false)}>
            <IoClose size={30} />
          </button>
        </div>
        
        {/* Search Bar */}
        <input type="text" placeholder="Search here..." className="w-full p-2  bg-blue-100 rounded-md mb-10" />
        
        {/* Navigation Links */}
        <ul className="flex flex-col  text-md md:text-lg">
          {navItems.map((v, i) => (
            <a href={v.path} key={i} className="flex justify-between items-center border-b-1  border-gray-300 py-3.5 px-2 cursor-pointer">
              <p className="hover:text-blue-600">{v.name}</p> 

            </a>
          ))}
        </ul>
        
        {/* Login/Register Buttons */}
        <div className="mt-15 flex gap-3 ">
          <button onClick={()=>navigate("/login")} className="border hover:text-blue-600 text-blue-950 font-semibold cursor-pointer  border-gray-300 bg-white px-4 py-2 rounded-md w-1/2">Log In</button>
          <button onClick={()=>navigate("/register")} className="bg-blue-500 text-white px-4 cursor-pointer py-2 font-semibold rounded-md w-1/2">Register</button>
        </div>
        
        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-10 ">
          <FaFacebookF size={25} className="text-blue-600 cursor-pointer" />
          <FaTwitter size={25} className="text-black-200 cursor-pointer" />
          <FaInstagram size={25} className="text-red-500 cursor-pointer" />
          <FaLinkedin size={25} className="text-blue-500 cursor-pointer" />
          <FaTelegram size={25} className="text-blue-700 cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;