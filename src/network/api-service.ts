/* eslint-disable @typescript-eslint/no-explicit-any */
import  axios, {isAxiosError } from "axios";
import { apiEndPoints } from "./api-end-points";


const apiAxiosInstance = axios.create({ baseURL: apiEndPoints.baseUrl });

interface IServerResponse<T> {
  s: number;
  r: T | null;
  m: string;
}

interface IMethodProps {
  params?:any;
  data?: any;
  url: string;
}

const errorString: string = "Oops something went wrong.";



export const API_POST = async <T>({
  url,
  data,
}: IMethodProps): Promise<IServerResponse<T>> => {
  try {

    const {data:serverResponse} = await apiAxiosInstance.post(url,data);

    return {s:1,m:"Success",r:serverResponse};

  } catch (e) {

    if(isAxiosError(e)){
      return { m: e.response?.data?.message ?? errorString, s: 0, r: null };
    }
 
    return {s:0,r:null,m:errorString};
  }
};
  



