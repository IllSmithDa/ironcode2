import { axiosFetch } from "@/axios";
import { User } from "@/types";

export const logout = async () => {
  const response = await axiosFetch.get('/api/users/logout-user',  { withCredentials: true });
  if (response.status === 200) {
    return true;
  }
  return false;
}

export const login = async (data: User) => {
  const response = await axiosFetch.post('/api/users/login-user', data);
  if (response.status = 200) {
    return true;
  }
  return false;
}

