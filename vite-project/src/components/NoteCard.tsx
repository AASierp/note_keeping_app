import type { Note } from "../types/Note";

type NoteCardProps = {
    note: Note
}

export function NoteCard( { note }: NoteCardProps ){

    return(
     
        <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.creationDate}</p>
            <p>{note.tags}</p>
        </div>
  )
}