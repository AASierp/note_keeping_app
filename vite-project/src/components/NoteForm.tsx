import { useState } from "react";
import type { Note } from "../types/Note";

interface NoteFormProps {
    createNote: (note: Note) => void
    notesLength: number
}

export function NoteForm({ createNote, notesLength }: NoteFormProps){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [errorMessage, setErrorMessage] = useState("")


    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();

        const newNote: Note = {
            id: notesLength+1,
            userId: 0,
            title: title,
            content: content,
            creationDate: "",
            tags: tags
        } 
        setErrorMessage("");

        try{
            const response = await fetch("http://localhost:3001/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newNote)
        })

            if(!response){
                setErrorMessage(`Failed to fetch - ${errorMessage}`)
                return
            }

            createNote(newNote)

            setTitle("");
            setContent("");
            setTags("");

            }catch(error){
                setErrorMessage(`Failed to fetch - ${errorMessage}`);
            }  
        }
    

    return(
        <div>
            <form onSubmit = {handleSubmit}>
                <fieldset>
                    <legend>Note Details</legend>
                    <label htmlFor="titleInput">Title</label>
                    <input id="titleInput" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="contentInput">Content</label>
                    <input id="contentInput" type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
                    <label htmlFor="tagsInput">Tags</label>
                    <input id="tagsInput" type="text" value={tags} onChange={(e)=> setTags(e.target.value)} />
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        </div>
    )
}