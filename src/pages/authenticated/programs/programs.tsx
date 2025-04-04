import { idea } from "@/lib/about";
import { ProgramDetail } from "@/model/program";
import SingleProgram from "./component/single-program";

const Programs = () => {
  return (
    <div id="our-program" className="bg-[#FFEFE5] pt-20 md:pt-20 px-5 md:px-30">
      <div className="flex flex-col md:flex-row ">
        <div className="flex-1/2">
          <div className="flex gap-2 items-center">
            <img src={idea} className="h-12" />
            <span className="text-xl md:text-2xl font-semibold"> What we Do</span>
          </div>
          <p className="text-3xl ml-2 md:text-5xl mt-3 font-bold">Our Programs</p> 
        </div>

        <div className="flex-1/2 md:pl-10">
          <p className="pt-8 text-md md:text-lg text-gray-500 font-semibold">
            Our programs and services are focused on our primary areas of impact
            that help people achieve their goals and strengthen communities.
          </p>
        </div>
      </div>
      <div className="pt-20  grid gap-8  grid-cols-1 xl:grid-cols-3 pb-30">
        {ProgramDetail.map((v, i) => (
          <SingleProgram key={i} {...v} />
        ))}
      </div>
    </div>
  );
};

export default Programs;
