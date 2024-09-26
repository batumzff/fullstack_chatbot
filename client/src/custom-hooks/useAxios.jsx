import axios from "axios"
import { getSessionUserData } from "../Helpers/crypto";

const useAxios = () => {
   const userData = getSessionUserData()

    const axiosPublic = axios.create({
        baseURL: "/api/v1/",
      });

      const axiosWithToken = axios.create({
        baseURL: "/api/v1/",
        headers: {Authorization: `Token ${userData?.data?.token}`}
      });
    
     
  return { axiosPublic, axiosWithToken }
}

export default useAxios