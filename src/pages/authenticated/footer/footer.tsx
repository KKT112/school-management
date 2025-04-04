// import { ranbow } from "@/lib/footer";
import { studyLogo } from "@/lib/logoes";
import { RecentPostArray } from "@/model/review";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import RecentPost from "./component/recentpost-single-item";

const Footer = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "#about-us" },
    { name: "Our Program", path: "#our-program" },
  ];

  return (
    <div className=" bg-gray-800 text-white">
    <div className="flex flex-col px-6 xl:flex-row pb-20 gap-20 md:px-25 pt-25 md:pb-10">
      <div className="flex-1/3  ">
        <div className="">
          {/* <img src={ranbow} className="relative left-30" /> */}
          <img src={studyLogo} className="pb-6 ml-2" />
          <p className="text-lg">
            We are passionate education dedicated to providing high-quality
            resources learners all backgrounds.
          </p>
        </div>

        <div className="flex gap-3 items-center pt-6">
          <p>
            <MdOutlineLocationOn size={25} />
          </p>
          <p className="text-lg">Yellow park, Ahmedabad, India</p>
        </div>
        <div className="flex gap-3 items-center pt-4">
          <p>
            <IoCallOutline size={25} />
          </p>
          <p className="text-lg ">
            <button className="cursor-pointer hover:text-amber-600">+(91) 9485826710</button>
          </p>
        </div>
      </div>
      <div className="flex-1/3 text-lg md:ml-20 ">
        <p className=" font-semibold text-2xl ">
          <button className="border-b-2  ">Pages</button>
        </p>
        <p className="flex flex-col gap-4 xl:gap-2 pt-6  xl:mr-60 ">
          {navItems.map((v, i) => (
            <a
              href={v.path}
              key={i}
              className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
            >
              <p>{v.name}</p>
              {/* <IoIosArrowDown /> */}
            </a>
          ))}
        </p>
      </div>
      <div className="flex-1/3">
        <p className="border-b mr-50 text-2xl mb-5 ">Recent Post</p>
        <div className="flex flex-col gap-6">
          {RecentPostArray.map((v, i) => (
            <RecentPost key={i} {...v} />
          ))}
        </div>
      </div>
    </div>
    <div className="text-center ">
           <div className="h-0.5 mx-7 bg-white "></div>
           <p className="text-lg  pb-7 pt-7">Copyright © 2024 All Rights Reserved by Studykids</p>
      
    </div>
    </div>
  );
};

export default Footer;
