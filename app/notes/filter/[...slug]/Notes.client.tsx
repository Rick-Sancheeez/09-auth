"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from './NotesPage.module.css'
import { useRouter } from "next/navigation";

interface Props {
  tag: string | undefined;
}

export default function NotesPageClient({
  tag,
}: Props) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const { data } = useQuery({
    queryKey: ["notes", page, tag, query],
    queryFn: () => fetchNotes(page, tag, query),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback(
    (query: string) => {
      setQuery(query);
      setPage(1);
    },
    300
  );

  const router = useRouter();

  return (
   <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox getQuery={handleSearch} />
        <button className={css.button} onClick={() => router.push('/notes/action/create')}>
          Create note +
        </button>
        { data && data.totalPages > 1 && (<Pagination
          currentPage={page}
          totalPages={data.totalPages ?? 1}
          setPage={setPage}
        /> )} 
      </div>

      {data && data.notes.length >= 1 && (<NoteList notes={data.notes} />) }
  </div>
  );
}
