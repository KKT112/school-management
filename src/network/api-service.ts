/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { isAxiosError } from "axios";
import { apiEndPoints } from "./api-end-points";

const apiAxiosInstance = axios.create({ baseURL: apiEndPoints.baseUrl });

interface IServerResponse<T> {
  s: number;
  r: T | null;
  m: string;
}

interface IMethodProps {
  params?: any;
  data?: any;
  url: string;
}

const errorString: string = "Oops something went wrong.";

export const API_POST = async <T>({
  url,
  data,
}: IMethodProps): Promise<IServerResponse<T>> => {
  try { 
    const { data: serverResponse } = await apiAxiosInstance.post(url, data);

    return serverResponse;
  } catch (e) {
    if (isAxiosError(e)) {
      return { m: e.response?.data?.m ?? errorString, s: 0, r: null };
    }

    return { s: 0, r: null, m: errorString };
  }
};

export const API_GET = async <T>({
  url,
  data,
  params,
}: IMethodProps): Promise<IServerResponse<T>> => {
  try {
    const { data: serverResponse } = await apiAxiosInstance.get(url, {
      data,
      params,
    });

    return serverResponse;
  } catch (e) {
    if (isAxiosError(e)) {
      return { m: e.response?.data?.m ?? errorString, s: 0, r: null };
    }

    return { s: 0, r: null, m: errorString };
  }
};
