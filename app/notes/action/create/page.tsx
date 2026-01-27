import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';


import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Create a new note",
  description: "NoteHub is a simple and efficient application designed for managing personal notes",
  openGraph: {
    title: `Create a new note`,
    description: 'NoteHub is a simple and efficient application designed for managing personal notes',
    url: `https://08-zustand-iota-black.vercel.app/notes/action/create`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub logo',
      },
    ],
    type: 'article',
  },
};


const CreateNotePage = () => {
    
    return (
        <main className={css.main}>
            <div className={css.container}>
            <h1 className={css.title}>Create note</h1>
	        <NoteForm />
            </div>
        </main>
    );
}

export default CreateNotePage;