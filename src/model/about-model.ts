import { commitement, mission } from "@/lib/about";

export interface IAboutModel{
  id:number;
    image:string;
    name:string;
    desc:string;
} 

export const AboutDetail:IAboutModel[] = [
    {
       id:1,
       image:mission,
       name:'Our Mission',
       desc:"At studykids our mission is to cultivate an environment where curiosity is sparked."
    },
    {
        id:2,
        image:commitement,
        name:'Our Commitement',
        desc:"As we embark on the journey of education together, we remain committed to providing."
     }
    
]