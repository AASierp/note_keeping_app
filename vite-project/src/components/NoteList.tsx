import { NoteCard } from "./NoteCard";
import type { Note } from "../types/Note";

type NoteListProps = {
    notes: Note[]
    deleteNote: (note: Note) => void
}

export function NoteList( { notes, deleteNote }: NoteListProps ){
    
    return(
    <>
        {notes.map((note, index) => {
        return(
            <div className="note-container" key={note.id}>
               {index+1}. <NoteCard note={ note } deleteNote={deleteNote}/>
            </div>
        )})}
    </>
    )
}