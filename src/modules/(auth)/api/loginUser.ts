import axios from "axios";
import { APIResponse, LoginFormData } from "../types/types";

const loginUser = async (data: LoginFormData) => {
  return axios.post<APIResponse>("/api/login", data)
}

export default loginUser