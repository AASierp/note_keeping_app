import { NoteCard } from "./NoteCard";
import type { Note, NoteListProps } from "../types/types.ts";

export function NoteList( { notes, deleteNote, selectNote, user }: NoteListProps ){

    function filterNoteByUserId(notes: Note[]){
        const userNotes = notes.filter((note: Note)=> note.userId === user.id);
        return userNotes
    }

    const userNotes = filterNoteByUserId(notes)
    
    return(
        <div>
            {userNotes.map((note, index) => {
            return(
                <div className="note-container" key={note.id}>
                {index+1}. <NoteCard note={ note } deleteNote={deleteNote} selectNote={selectNote} />
                </div>
            )})}
        </div>
    )
}