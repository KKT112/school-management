
import { IAboutModel } from "@/model/about-model";

const SingleRight = ({name,image,desc}:IAboutModel) => {
  return (
    <div className="flex items-center gap-8 pb-10 ">
      <div  className="flex gap-10">
        <img src={image} className="h-25"/>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl md:text-2xl font-bold ">{name}</p>
        <p className="text-md text-gray-500 font-semiboldbold">{desc}</p>
      </div>
    </div>
  )
}

export default SingleRight;
