import type { Note } from "../types/Note";

type NoteCardProps = {
    note: Note
    deleteNote: (note: Note) => void
}

export function NoteCard( { note, deleteNote }: NoteCardProps ){

    const deleteBackEndNote = async (noteId: number) => {
        try{
            const response = await fetch(`http://localhost:3001/notes/${noteId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"},
            })
            // console.log(response)
            // console.log(response.json)

            return response.json()
        } catch(error) {
            console.log(error)
        }  
    }

    function handleDelete(note: Note): void {
        deleteNote(note)
        deleteBackEndNote(note.id)
    }

    return(
     
        <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.creationDate}</p>
            <p>{note.tags}</p>
            <button onClick={() => {handleDelete(note)}}>Delete Note</button>
        </div>
  )
}