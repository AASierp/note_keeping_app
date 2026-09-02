import { useState } from "react";
import { useEffect } from 'react'
import { postData, putData } from "../services/notesService";
import type { Note, NoteFormProps } from "../types/types.ts";

export function NoteForm({ createNote, notesLength, editedNote, updateNote, selectNote, user }: NoteFormProps){

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
                userId: user.id,
                title: title,
                content: content,
                creationDate: "",
                tags: tags
            } 

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
            
            putData(tempNote)
            updateNote(tempNote)

            setTitle("");
            setContent("");
            setTags("");
            selectNote(null);
        }
    }

    return(
        <div className="text-amber-50">
            <form onSubmit = {handleSubmit}> {/* Create New Note */}
                <fieldset className="flex items-center py-1 justify-evenly border-2">
                    {editedNote
                    ? <legend>Edit Note</legend>
                    : <legend className="text-center">Create a Note</legend>
                    }
                    <label htmlFor="titleInput">Title</label>
                    <input className="bg-amber-50 m-1" id="titleInput" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="contentInput">Content</label>
                    <input className="bg-amber-50 m-1" id="contentInput" type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
                    <label htmlFor="tagsInput">Tags</label>
                    <input className="bg-amber-50 m-1" id="tagsInput" type="text" value={tags} onChange={(e)=> setTags(e.target.value)} />
                    <button className="m-2 px-3 bg-blue-900 rounded-lg border-2 border-amber-50 hover:bg-blue-400 text-white" type="submit">Submit</button>
                </fieldset>
            </form>
        </div>
    )
}