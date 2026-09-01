import { useState } from "react";
import { useEffect } from 'react'
import { postData, putData } from "../services/notesService";
import type { Note, NoteFormProps } from "../types/types.ts";

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