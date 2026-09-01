import { NoteCard } from "./NoteCard";
import type { NoteListProps } from "../types/types.ts";

export function NoteList( { notes, deleteNote, selectNote }: NoteListProps ){
    
    return(
        <div>
            {notes.map((note, index) => {
            return(
                <div className="note-container" key={note.id}>
                {index+1}. <NoteCard note={ note } deleteNote={deleteNote} selectNote={selectNote} />
                </div>
            )})}
        </div>
    )
}