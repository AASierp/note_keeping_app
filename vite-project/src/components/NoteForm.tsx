import { useState } from "react";

export function NoteForm(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");


    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();

        

    }

    return(
        <div>
            <form onSubmit={() => handleSubmit()}>
                <fieldset>
                    <legend>Note Details</legend>
                    <label htmlFor="titleInput">Title</label>
                    <input id="titleInput" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="contentInput">Content</label>
                    <input id="contentInput" type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
                    <label htmlFor="tagsInput">Tags</label>
                    <input id="tagsInput" type="text" value={tags} onChange={(e)=> setTags(e.target.value)} />
                    <button>Submit</button>
                </fieldset>
            </form>
        </div>
    )
}