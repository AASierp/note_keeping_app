    import type { User } from "../types/types.ts";

    export async function getUsers(): Promise<User[]> {
      try{
        const response = await fetch("http://localhost:3001/users");
        if(!response.ok){
          console.error(`Failed to fetch`)
          return []
        }
        
        const data: User[] = await response.json();
        return data
        } catch(error){
            console.error(`Failed to get data`);
        }

        return [];
    }

    export async function postUser(newUser: User){
        try {
                const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newUser)
            })

            if(!response.ok){
                console.log(`Failed to post data`)
                return
            }
            } catch{
              console.log(`Failed to post data`)
            }
        }

    export async function putUser(tempUser: User){
         try {
            const response = await fetch(`http://localhost:3001/Users/${tempUser.id}`, {
                method: "PUT",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify(tempUser)
            })

            if(!response.ok){
                console.error(`Failed to update Data`)
                return
            }

         } catch{
            console.error(`Failed to update Data`)
         }
    }

    export const deleteUser = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/Users/${userId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"},
            })

            return response.json()
        } catch(error) {
            console.log(error)
        }  
    }
