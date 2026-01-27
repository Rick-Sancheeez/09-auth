import css from './SearchBox.module.css'

interface SearchBoxProps {
    getQuery: (query: string) => void;
}

export default function SearchBox({getQuery} : SearchBoxProps) {
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            onChange={(event) => getQuery(event.target.value)}
        />
    );
}