import { NoteCard } from "./NoteCard";
import type { Note, NoteListProps } from "../types/types.ts";
import { useState } from 'react'

export function NoteList( { notes, deleteNote, selectNote, user }: NoteListProps ){
    const [selectedTag, setSelectedTag] = useState<string>("Tag Filter")
    let tagList: string[] = []

    function filterNoteByUserId(notes: Note[]){
        const userNotes = notes.filter((note: Note)=> note.userId === user.id);
        let tempTags = ''

        userNotes.forEach((note) => {
            if (note.tags.length > 0) {
                tempTags += ` ${note.tags}`
            }
        })
        
        tagList = tempTags.split(/[, #]/).filter(Boolean)
        tagList = ([...new Set(tagList)])
        return userNotes
    }

    function handleTags(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedTag(event.target.value)
    }

    const userNotes = filterNoteByUserId(notes)
    const filteredNotes = userNotes.filter((note) => note.tags.includes(selectedTag))
    
    return(
        <div>
            <div>
                <label htmlFor="tagSearch">Search by tag(s)</label>
                <select 
                    id="tagSearch"
                    value={selectedTag}
                    onChange={handleTags}
                >
                    <option>Tag Filter</option>
                    {tagList.sort().map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>
            <div className="m-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {selectedTag === 'Tag Filter'
                ? <>
                    {userNotes.map((note) => {
                    return(
                        <div className="note-container" key={note.id}>
                        <NoteCard note={ note } deleteNote={deleteNote} selectNote={selectNote} />
                        </div>
                    )})}
                </>
                : <>
                    {filteredNotes.map((note) => {
                    return(
                        <div className="note-container" key={note.id}>
                        <NoteCard note={ note } deleteNote={deleteNote} selectNote={selectNote} />
                        </div>
                    )})}
                </>
                }
            </div>
        </div>
    )
}