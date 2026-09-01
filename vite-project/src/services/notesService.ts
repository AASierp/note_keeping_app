    import type { Note } from "../types/types.ts";

    export async function getData(): Promise<Note[]> {
      try{
        const response = await fetch("http://localhost:3001/notes");
        if(!response.ok){
          console.error(`Failed to fetch`)
          return []
        }
        
        const data: Note[] = await response.json();
        return data
        } catch(error){
            console.error(`Failed to get data`);
        }

        return [];
    }

    export async function postData(newnote: Note){
        try {
                const response = await fetch("http://localhost:3001/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newnote)
            })

            if(!response.ok){
                console.log(`Failed to post data`)
                return
            }
            } catch{
              console.log(`Failed to post data`)
            }
        }

    export async function putData(tempnote: Note){
         try {
            const response = await fetch(`http://localhost:3001/notes/${tempnote.id}`, {
                method: "PUT",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify(tempnote)
            })

            if(!response.ok){
                console.error(`Failed to update Data`)
                return
            }

         } catch{
            console.error(`Failed to update Data`)
         }
    }

    export const deleteData = async (noteId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/notes/${noteId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"},
            })

            return response.json()
        } catch(error) {
            console.log(error)
        }  
    }
