import type { Note } from "../types/Note";
import { NoteForm } from "./NoteForm";

type NoteCardProps = {
    note: Note
    deleteNote: (note: Note) => void
    updateNote: (note: Note) => void
}

export function NoteCard( { note, deleteNote, updateNote }: NoteCardProps ){

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

    async function updateBackEndNote(noteId: number){

            try{
                const response = await fetch(`http://localhost:3001/notes/${noteId}`, {
                    method: "PUT",
                    headers: {"Content-Type": "Application/json"},
                    body: JSON.stringify(editedNote)
                })

            }catch{

            }
        }

    function handleDelete(note: Note): void {
        deleteNote(note)
        deleteBackEndNote(note.id)
    }


    function handleUpdate(note: Note): void {
        updateNote(note)
        updateBackEndNote(note.id)
    }


    return(
     
        <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.creationDate}</p>
            <p>{note.tags}</p>
            <button onClick={() => {handleDelete(note)}}>Delete Note</button>
            <button onClick={() => {handleUpdate(note)}}>Edit Note</button>
        </div>
  )
}