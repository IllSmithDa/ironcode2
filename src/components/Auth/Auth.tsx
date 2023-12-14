'use client';
import { axiosFetch } from "@/axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/Features/UserSlice";
const AuthContext = createContext('');

export default function Auth({ children }: {
  children: any
}) {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const link = '/api/users/get-user-session';
  const dispatch = useDispatch();
  const { push } = useRouter();
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosFetch.get(link, { withCredentials: true });
        const { username:user } = response.data;
        dispatch(setUser(response.data))
        setUsername(user);
        setIsLoading(false)
      } catch(err) {
        console.log(err);
        push('/login')
      }
    }
    if (link) checkUser();
  }, [link, push, dispatch])


  return (
    <section style={{ width: '100%', backgroundColor: '#111'}}>
    {
      isLoading ?
      <Loader />:
      <>{children}</>
    }
    </section>
  )
}
