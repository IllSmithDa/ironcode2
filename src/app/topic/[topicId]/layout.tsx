import { axiosFetch } from '@/axios'
import type { Metadata, ResolvingMetadata } from 'next'
type Props = {
  params: {
    topicId: string,
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.topicId
  const link = `/api/concept/topic-object/${id}`;
  // fetch data
  const topicObj = (await axiosFetch.get(link)).data.data;
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `${topicObj.name} | IronCodeMan`,
    description: topicObj.description
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <>{children}</>
  )
}