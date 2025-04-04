import { development, development2, living, living2, responsiability, responsiability2 } from "@/lib/programs";

export interface IProgramData{
    id:number;
    imageMain:string;
    imageSub:string;
    name:string;
    desc:string;
}

export const ProgramDetail:IProgramData[] = [
   
    {
        id:1,
        imageMain:development,
        imageSub:development2,
        name:"Youth Development",
        desc:"We help young people to grow into healthy, thriving adults by offering supportive education.",

    },
    {
        id:2,
        imageMain:living,
        imageSub:living2,
        name:"Health Living",
        desc:"We help young people to grow into healthy, thriving adults by offering supportive education.",

    },
   
    {
        id:3,
        imageMain:responsiability,
        imageSub:responsiability2,
        name:"Social Responsibility",
        desc:"We help young people to grow into healthy, thriving adults by offering supportive education.",

    },

]