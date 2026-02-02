import axios from "axios";
import { APIResponse, LoginFormData, UserData } from "../types/types";

const loginUser = async (data: LoginFormData) => {
  return axios.post<APIResponse<UserData>>("/api/login", data);
};

export default loginUser;
