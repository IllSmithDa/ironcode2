import { useEffect, useState } from "react";
import { Language } from '../types';
import { axiosFetch } from '../axios';

export default function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = `/api/language/all-languages`;
  useEffect(() => {
    // https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
    const fetchData = async () => {
      try {
        const res = await axiosFetch.get(url)
        if (res.status === 200) {
          setLanguages([...res.data.data])
        }
      } catch (err) {
        setIsError(true);
      }
    }
    fetchData();
  }, [url]);

  return [languages, isError ]
}