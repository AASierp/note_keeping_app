
import './App.css'
import { useState, useEffect } from 'react';
import { type Note, type User } from "./types/types.ts";
import { NoteList } from './components/NoteList';
import { NoteForm } from './components/NoteForm';
import { getData, deleteData } from './services/notesService';
import { Landing } from './components/Landing.tsx'

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editedNote, setEditedNote] = useState<Note | null>(null);
  const [user, setUser] = useState<User | null>(null);

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


    return(
      <div>
        {/* navbar component */}

        {/* if logged in, need to also filter on logged in user*/}
        {user
        ? <>
          <NoteForm createNote={createNote} notesLength={notes.length} editedNote = {editedNote} updateNote={updateNote} selectNote={selectNote} user={user} />
          <NoteList notes={notes} deleteNote={deleteNote} selectNote={selectNote} user = {user}/>
          <button onClick={logOut}>Log Out</button>
        </>
        : <>
          <Landing assignUser={assignUser}/>
        </>
        }
        
        {/* if not logged in */}
        {/* login/signup component */}
      </div>
  )
}

export default App
