import css from './Home.module.css'
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "NoteHub",
  description: "This page does not exist",
  openGraph: {
    title: `NoteHub - Page not found`,
    description: 'This page does not exist',
    //url: ``,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://08-zustand-iota-black.vercel.app/',
        width: 1200,
        height: 630,
        alt: 'NoteHub logo',
      },
    ],
    type: 'article',
  },
};


const NotFound = () => {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    );
}

export default NotFound;