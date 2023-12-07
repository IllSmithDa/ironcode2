import { useEffect, useState } from "react";
import { ConceptTopic } from '../types';
import { axiosFetch } from '../axios';

export default function useTopicId({
  topicId,
}: {
  topicId: string
}) {
  const [topic, setTopic] = useState<ConceptTopic>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = `/api/concept/topic-object/${topicId}`;
  useEffect(() => {
    // https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosFetch.get(url)
        if (res.status === 200) {
          // console.log(res.data);
          setTopic(res.data.data)
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [topicId, url]);

  return [topic]
}