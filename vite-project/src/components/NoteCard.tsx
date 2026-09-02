import type { NoteCardProps } from "../types/types.ts";

export function NoteCard( { note, deleteNote, selectNote }: NoteCardProps ){

    return(
        <div className="min-w-1/2 min-h-50 bg-amber-200 border-2 p-3 rounded-lg shadow-xl hover:border-blue-100">
            <div>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <p>{note.creationDate}</p>
                <p>{note.tags}</p>
            </div>
            <div className="flex justify-end align-baseline">
                <button className="m-2 px-3 bg-purple-900 rounded-lg border-2 border-amber-50 hover:bg-indigo-500 text-white" onClick={() => {selectNote(note)}}>Edit Note</button>
                <button className="m-2 px-3 bg-purple-900 rounded-lg border-2 border-amber-50 hover:bg-indigo-500 text-white" onClick={() => {deleteNote(note)}}>Delete Note</button>
            </div>
        </div>
    )
}