import { axiosFetch } from '@/axios'
import type { Metadata, ResolvingMetadata } from 'next'
type Props = {
  params: {
    languageId: string,
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.languageId
  const link = `/api/language/by-id/${id}`;
  // fetch data
  const languageRes = (await axiosFetch.get(link)).data.data;
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `${languageRes.name} | IronCodeMan`,
    description: `all concepts for ${languageRes.name}`
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