import { BASE_URL } from "./baseurl";
import { commonAPI } from "./commonAPI";




export const registerAPI = async(user)=>{
    return  await commonAPI('POST',`${BASE_URL}/owner/register`,user,"")
  }
  

export const loginAPI = async(user)=>{
    return  await commonAPI('POST',`${BASE_URL}/owner/login`,user,"")
    }

    export const UserpswdChangeApi = async(body)=>{
      return await commonAPI('PUT',`${BASE_URL}/user/password`,body,"")
   }


   export const carRegisterAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${BASE_URL}/register/add`,reqBody,reqHeader)
  }

  export const carDetailsAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/register/details`,'',reqHeader)
  }