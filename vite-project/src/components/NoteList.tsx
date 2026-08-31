import { NoteCard } from "./NoteCard";
import type { Note } from "../types/Note";

type NoteListProps = {
    notes: Note[]
}

export function NoteList( { notes }: NoteListProps ){
    
    return(
    <>
        {notes.map((note) => {
        return(
            <div className="note-container" key={note.id}>
                <NoteCard note={ note } />
            </div>
        )})}
    </>
    )
}