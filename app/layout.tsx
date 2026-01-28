import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import css from './Home.module.css';
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from '@/components/Footer/Footer';
import AuthProvider from '@/components/AuthProvider/AuthProvider';


/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ["latin"],
  weight: ['400', '700'],
  display: 'swap'
});


export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is a simple and efficient application designed for managing personal notes",
  openGraph: {
    title: `NoteHub`,
    description: 'NoteHub is a simple and efficient application designed for managing personal notes',
    url: `https://08-zustand-iota-black.vercel.app/`,
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

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${roboto.variable}`}>

          <TanStackProvider > 
            <AuthProvider>
              <Header />
              <main className={css.main}>
                {children}
                {modal}
              </main>
              <Footer />  
            </AuthProvider>
          </TanStackProvider>
    
        </body>
    </html>
  );
}
