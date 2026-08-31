
import './App.css'
import { useState, useEffect } from 'react';
import type { Note } from './types/Note';
import { NoteList } from './components/NoteList';
import { NoteForm } from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  //const [message, setMessage] = useState("");

  useEffect(() => {

    async function fetchData(): Promise<void> {
      setErrorMessage("");

      try{
      const response = await fetch("http://localhost:3001/notes");
      if(!response.ok){
        setErrorMessage(`Failed to fetch - ${errorMessage}`)
        return
      }
      const data = await response.json();
      setNotes(data);

      }catch(error){
        setErrorMessage(`Failed to fetch - ${errorMessage}`);
      }  
    }
    
    fetchData();
 },[])

  function createNote(newNote: Note): void {
    setNotes(prevNotes => [...prevNotes, newNote])
  }

  function deleteNote(delNote: Note): void {
    setNotes(notes.filter(n => n.id !== delNote.id))
  }

    return(
      <>
        <div>
          <NoteForm createNote={createNote} notesLength={notes.length} />
          <NoteList notes={notes} deleteNote={deleteNote} />
        </div>
      </>
      
  )
}

export default App
