import axios from "axios";
import { APIResponse, SignupFormData, UserData } from "../types/types";

const signupUser = async (data: SignupFormData) => {
  return axios.post<APIResponse<UserData>>("/api/signup", data);
};

export default signupUser;
