'use client';
import { useEffect, useState } from "react";
import { ConceptTopic } from '../types';
import { axiosFetch } from '../axios';

export default function useConceptTopics() {
  const [topics, setTopics] = useState<ConceptTopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = `/api/concept/all-topics`;
  useEffect(() => {
    // https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosFetch.get(url)
        if (res.status === 200) {
          setTopics([...res.data.data])
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return [topics];
}