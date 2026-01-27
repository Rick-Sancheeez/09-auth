'use client';

import css from './NoteForm.module.css'
import {NoteFormValues} from '@/types/NoteFormValues'
import {useNoteDraftStore} from '@/lib/store/noteStore';
import {createNote} from '../../lib/api'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';


export default function NoteForm() {

    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (note: NoteFormValues) => createNote(note),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            router.push('/notes/filter/all'); 
        }
    });

    const handleSubmit = (
        formData: FormData
    ) => {
        const values: NoteFormValues = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            tag: formData.get('tag') as string,
        };

        mutation.mutate(values);
    };

    const { draft, setDraft, clearDraft } = useNoteDraftStore();
	
	
    const handleChange = (
        event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setDraft({
        ...draft,
        [event.target.name]: event.target.value,
        });
    };

    return (
    
    <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" className={css.input} defaultValue={draft?.title} onChange={handleChange}/>
        </div>

        <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            onChange={handleChange}
            defaultValue={draft?.content}
            ></textarea>
        </div>

        <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select id="tag" name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
                <option value="">Select category...</option>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
            </select>
        </div>

        <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={() => router.push('/notes/filter/all')}>
            Cancel
            </button>
            <button
            type="submit"
            className={css.submitButton}
            //disabled=false
            >
            Create note
            </button>
        </div>
    </form>

    );
}