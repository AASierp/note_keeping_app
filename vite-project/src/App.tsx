
import './App.css'
import { useState, useEffect } from 'react';
import type { Note } from './types/Note';
import { NoteList } from './components/NoteList';
import { NoteForm } from './components/NoteForm';
import { getData, deleteData } from './services/notesService';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editedNote, setEditedNote] = useState<Note | null>(null);

  useEffect(() => {

    // async function fetchData(): Promise<void> {
    //   setErrorMessage("");

    //   try{
    //     const response = await fetch("http://localhost:3001/notes");
    //     if(!response.ok){
    //       setErrorMessage(`Failed to fetch - ${errorMessage}`)
    //       return
    //   }
    //   const data = await response.json();
    //   setNotes(data);

    //   }catch(error){
    //     setErrorMessage(`Failed to fetch - ${errorMessage}`);
    //   }  
    // }
    
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

    // console.log(updatedNotes)
    // console.log(notes)
    setNotes(updatedNotes)
  }

  function selectNote(note: Note | null): void {
    setEditedNote(note)
  }

    return(
      <>
        <div>
          <NoteForm createNote={createNote} notesLength={notes.length} editedNote = {editedNote} updateNote={updateNote} selectNote={selectNote} />
          <NoteList notes={notes} deleteNote={deleteNote} selectNote={selectNote}/>
        </div>
      </>
      
  )
}

export default App
