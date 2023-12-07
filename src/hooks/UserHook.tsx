import { useEffect, useState } from "react";
import { Language, User } from '../types';
import { axiosFetch } from '../axios';

export default function useStory() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = `/api/users/get-user-session`;
  useEffect(() => {
    // https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosFetch.get(url)
        if (res.status === 200) {
          // console.log(res.data);
          setUser(res.data.user)
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return [user, isError, isLoading ]
}