import axios from "axios"
import { useRouter } from "next/router"
import { useMutation } from "react-query"


// get academies
export async function getAcademies() {
  const res = await axios.get("http://localhost:5000/api/v1/bootcamps")
  return res.data;      
} 


export async function getAcademyDetails(academyId) {
      const res = await axios.get(`http://localhost:5000/api/v1/bootcamps/${academyId}`)
       return res.data;   
    }

// post academy

export const postAcademy = async (academyData) => {
  return axios.post("http://localhost:5000/api/v1/bootcamps", academyData);
}

export const usePostAcademy = () => {
const router = useRouter();
return useMutation(postAcademy,{
  onSuccess: (data) => {
    router.push("/");
  },
})
}

// delete academy

    export async function deleteAcademy(academyId) {
      console.log(academyId)
      try {
        const res = await fetch(`/api/v1/bootcamps/${academyId}`, {
          method: 'DELETE'
        });
    
        return await res.json();
      } catch (error) {
        console.log(error.message);
      }
    }
    