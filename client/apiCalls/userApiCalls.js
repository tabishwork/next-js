import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

// user to login

export const login = async (userData) => {
  return await axios.post("http://localhost:5000/api/v1/auth/login", userData);
}

export const useLogin = () => {
const router = useRouter();
return useMutation(login,{
  onSuccess: (data) => {
    console.log(data)
    router.push("/");
  },
})
}