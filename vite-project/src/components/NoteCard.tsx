import type { NoteCardProps } from "../types/types.ts";

export function NoteCard( { note, deleteNote, selectNote }: NoteCardProps ){

    return(
        <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.creationDate}</p>
            <p>{note.tags}</p>
            <button onClick={() => {deleteNote(note)}}>Delete Note</button>
            <button onClick={() => {selectNote(note)}}>Edit Note</button>
        </div>
    )
}