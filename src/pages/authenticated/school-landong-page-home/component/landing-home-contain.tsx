import {  earth, paper, shape, SideImage, triangle } from "@/lib/hero-section";
import { FiPhoneCall } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeContant = () => {

  const navigate = useNavigate();
  return (
    <div className="flex px-5 pt-10">
      <img src={earth} className="animate-bounce h-10 xl:h-15  mt-35" />
      <div className="flex flex-col  text-center md:text-start md:flex-row  ">
        <div className="pt-15 md:px-10 xl:pt-25 xl:px-15 md:w-[50%]">
          <div className="flex flex-col-reverse gap-5 xl:flex-row items-center">
            <div className="">
              <p className="bg-blue-100 px-4 py-1 text-blue-700 text-md">
                100% Satisfaction Guarantee
              </p>
            </div>
            <img src={shape} className="h-12 md:h-14" />
          </div>
          <p className="text-3xl mt-4  xl:text-6xl font-bold md:leading-10  xl:leading-16 text-blue-950">
            Learn <span className="text-blue-700 ">Skills</span> From Our Top
            Instructors
          </p>
          <p className="mt-4 md:mt-5 text-gray-600 text-md xl:w-125 leading-7">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattisBorem ipsum dolor sit amet
            consectetur adipiscing area we followelit.
          </p>
          <div className="flex flex-col justify-center gap-12 xl:flex-row  md:gap-9 items-center mt-12 md:mt-15 xl:justify-start  ">
            <p>
              <button onClick={()=>navigate("/register")} className=" flex cursor-pointer  items-center hover:bg-blue-900  gap-4 px-8 py-2 md:px-10  md:py-3 bg-blue-600 text-white rounded-md text-xl">
               <p className="text-lg xl:text-xl">Register Now</p> <p><FaArrowRight /></p> 

              </button>
            </p>
            <div className="flex flex-col gap-5 items-center md:flex-row ">
              <p className="flex items-center">
                <FiPhoneCall className="h-7 w-7 md:w-10 md:h-10 text-blue-500" /> 
              </p>
              <p>
                <span className="text-gray-600 font-semibold">
                  Have any Question?
                </span>
                <p className="font-bold text-xl text-blue-950 hover:text-blue-700 cursor-pointer">993-00-67777</p>
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] w-full  ">
          <div className="relative w-full items-center">
            <img src={SideImage} className="mt-10 md:mt-15 xl:mt-15 w-auto " />
            <img src={paper} className=" md:h-15 animate-bounce md:top-30 md:left-30 absolute top-10 h-13  "/>
            <img src={triangle} className="absolute xl:h-15 sm:h-10 h-10 md:h-11 animate-spin md:right-10 md:top-30 top-10 right-1"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContant;
