export type Note = {
    id: number,
    userId: number
    title: string,
    content: string,
    creationDate: string
    tags?: string
}

export type User = {
    id: number,
    email: string
    password: string
}

export type NoteCardProps = {
    note: Note
    deleteNote: (note: Note) => void
    selectNote: (note: Note | null) => void
}

export interface NoteFormProps {
    createNote: (note: Note) => void
    notesLength: number
    editedNote: Note | null
    updateNote: (note: Note) => void
    selectNote: (note: Note | null) => void
}

export type NoteListProps = {
    notes: Note[]
    deleteNote: (note: Note) => void
    selectNote: (note: Note | null) => void
}