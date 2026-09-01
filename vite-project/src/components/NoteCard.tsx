import type { Note } from "../types/Note";

type NoteCardProps = {
    note: Note
    deleteNote: (note: Note) => void
    selectNote: (note: Note | null) => void
}

export function NoteCard( { note, deleteNote, selectNote }: NoteCardProps ){

    // const deleteBackEndNote = async (noteId: number) => {
    //     try{
    //         const response = await fetch(`http://localhost:3001/notes/${noteId}`, {
    //             method: "DELETE",
    //             headers: { "Content-Type": "application/json"},
    //         })

    //         return response.json()
    //     } catch(error) {
    //         console.log(error)
    //     }  
    //}

    //deleteData(note.id)

    // function handleDelete(note: Note): void {
    //     deleteNote(note)
    //     deleteData(note.id)
    // }

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