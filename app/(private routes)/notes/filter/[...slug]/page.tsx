import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import {Metadata} from 'next';

import NotesPageClient from './Notes.client'
import { fetchNotesServer } from "@/lib/api/serverApi";

type Props = { 
    params: Promise<{slug: string[]}>, 
};

export async function generateMetadata({params} : Props) : Promise<Metadata> {
  const {slug} = await params;

  return {
    title: `Note category: ${slug[0]}`,
    description: `${slug[0]}`,
    openGraph: {
      title: `Note category: ${slug[0]}`,
      description: `${slug[0]} note list`,
      url: `https://08-zustand-iota-black.vercel.app/notes/filter/${slug[0]}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub logo`,
        },
      ],
      type: 'article',
    }
  }
}

export default async function NotesPage({params} : Props) {
    const {slug} = await params;

    const page = 1;
    const category = slug[0] === 'all' ? undefined : slug[0]; 
    const query = undefined;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', page, category, query],
        queryFn: () => fetchNotesServer(page, category),
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient tag={category}/>
    </HydrationBoundary>
  );
}