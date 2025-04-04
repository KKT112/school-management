import { idea } from "@/lib/about";
import { AboutDetail } from "@/model/about-model";
import SingleRight from "./single-right";

const Right = () => {
  return (
    <div  className="flex-1/2 ">
      <div className="flex items-center gap-5">
        <img src={idea} />
        <p className="text-3xl font-semibold ">About Us</p>
      </div>
      <p className="text-2xl md:text-3xl  ledding-12 xl:text-5xl pt-4 font-bold md:leading-14">Discover Story Nurturing Young Minds at studykids</p>
      <p className="text-sm md:text-md  text-gray-500 font-semibold mt-6">
        The Y is dedicated to providing comprehensive programs and services that
        enrich communities — and all of the people who live in them — across the
        country in fulfillment of our mission.
      </p>
      <div>
        <div className="pt-15">
            {AboutDetail.map((v,i)=>(
                <SingleRight key={i} {...v}/>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default Right;
