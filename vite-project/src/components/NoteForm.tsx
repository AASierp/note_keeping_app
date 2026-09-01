import { useState } from "react";
import type { Note } from "../types/Note";
import { useEffect } from 'react'
import { postData, putData } from "../services/notesService";

interface NoteFormProps {
    createNote: (note: Note) => void
    notesLength: number
    editedNote: Note | null
    updateNote: (note: Note) => void
    selectNote: (note: Note | null) => void
}

export function NoteForm({ createNote, notesLength, editedNote, updateNote, selectNote }: NoteFormProps){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    


    useEffect(() => {
        if (editedNote) {
            setTitle(editedNote.title);
            setContent(editedNote.content);
            setTags(editedNote.tags || "");
        } else {
            setTitle("");
            setContent("");
            setTags("");
        }
    }, [selectNote])

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();

        if (!editedNote) {
            const newNote: Note = {
                id: notesLength+1,
                userId: 0,
                title: title,
                content: content,
                creationDate: "",
                tags: tags
            } 

            // try{
            //     const response = await fetch("http://localhost:3001/notes", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json"},
            //     body: JSON.stringify(newNote)
            // })

            //     if(!response){
            //         setErrorMessage(`Failed to fetch - ${errorMessage}`)
            //         return
            //     }

                postData(newNote)
                createNote(newNote)

                setTitle("");
                setContent("");
                setTags("");

        } else { // if editedNote is not null, then change to updateNote functions, finally selectNote = null
            const tempNote: Note = {
                id: editedNote.id,
                userId: editedNote.userId,
                title: title,
                content: content,
                creationDate: editedNote.creationDate,
                tags: tags
            } 
            

            // try{
            // const response = await fetch(`http://localhost:3001/notes/${editedNote.id}`, {
            //     method: "PUT",
            //     headers: {"Content-Type": "Application/json"},
            //     body: JSON.stringify(tempNote)
            // })

            // if(!response){
            //     setErrorMessage(`Failed to update - ${errorMessage}`)
            //     return
            // }
            putData(tempNote)
            updateNote(tempNote)

            setTitle("");
            setContent("");
            setTags("");
            selectNote(null);

        }
    }

    return(
        <div>
            {!editedNote
            ? <form onSubmit = {handleSubmit}> {/* Create New Note */}
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
            : <form onSubmit = {handleSubmit}> {/* Edit Note */}
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
            }
        </div>
    )
}