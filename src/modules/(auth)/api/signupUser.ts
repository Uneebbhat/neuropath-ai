import axios from "axios"
import { APIResponse, SignupFormData } from "../types/types"

const signupUser = async (data: SignupFormData) => {
  return axios.post<APIResponse>("/api/signup", data)
}

export default signupUser