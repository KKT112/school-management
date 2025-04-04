import { review1, review2 } from "@/lib/footer";

export interface IRecentPost{
    id:number;
    image:string;
    date:string;
    desc:string;

}

export const RecentPostArray:IRecentPost[] = [

    {
        id:1,
        image:review1,
        date:"October 29, 2023",
        desc:"Avoid These 4 Common When Managing Remote Teams",
    },
    {
        id:2,
        image:review2,
        date:"October 20, 2022",
        desc:"How To Draw Realistic Lips In 7 Simple Steps",
    },
]