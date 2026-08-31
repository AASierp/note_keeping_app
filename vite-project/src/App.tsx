
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
 },[notes])

 

    return(
      <>
        <div>
          <NoteForm />
          <NoteList notes={notes}/>
        </div>
      </>
      
  )
}

export default App
