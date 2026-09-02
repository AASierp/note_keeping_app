
import './App.css'
import { useState, useEffect } from 'react';
import { type Note, type User } from "./types/types.ts";
import { NoteList } from './components/NoteList';
import { NoteForm } from './components/NoteForm';
import { getData, deleteData } from './services/notesService';
import { Landing } from './components/Landing.tsx'
import { NavBar } from './components/NavBar.tsx'

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editedNote, setEditedNote] = useState<Note | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null)

  useEffect(() => {

    async function fetchData(){
      const data: Note[] = await getData();
      setNotes(data);
    }

    fetchData()
    
 },[])

  function createNote(newNote: Note): void {
    setNotes(prevNotes => [...prevNotes, newNote])
  }

  function deleteNote(delNote: Note): void {
    setNotes(notes.filter(n => n.id !== delNote.id))
    deleteData(delNote.id)
  }

  function updateNote(editedNote: Note): void{
    const updatedNotes = notes.map(n => n.id === editedNote.id ? editedNote : n)
    setNotes(updatedNotes)
  }

  function selectNote(note: Note | null): void {
    setEditedNote(note)
  }

  function assignUser(user: User | null) {
    setUser(user)
  }

  function logOut(){
    setUser(null);
  }

  function editFlag(user: User | null) {
    setEditUser(user)
  }

    return(
      <div className='bg-slate-500 min-h-screen'>
        <NavBar user={user} logOut={logOut} editFlag={editFlag}/>

        {user && !editUser
        ? <>
          <NoteForm createNote={createNote} notesLength={notes.length} editedNote = {editedNote} updateNote={updateNote} selectNote={selectNote} user={user} />
          <NoteList notes={notes} deleteNote={deleteNote} selectNote={selectNote} user = {user}/>
        </>
        : <>
          <Landing assignUser={assignUser} editUser={editUser} editFlag={editFlag} />
        </>
        }
      </div>
  )
}

export default App
