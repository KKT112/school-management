import { IRecentPost } from "@/model/review";

const RecentPost = ({image,date, desc}:IRecentPost) => {
  return (
    <div className="flex gap-4 ">
    <div >
      <img src={image} className=""/>
    </div>
    <div className="pl-2">
        <p className="text-gray-300 text-lg">{date}</p>
        <p className="font-bold text-md">{desc}</p>
    </div>
    </div>
  );
};

export default RecentPost;
