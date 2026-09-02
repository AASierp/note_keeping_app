import { useState } from 'react'
import { type User, type LandingProps } from '../types/types.ts'
import { getUsers, postUser, putUser } from '../services/usersService.ts'

export function Landing({ assignUser, editUser, editFlag }: LandingProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let exists: boolean = false
    let isValid: boolean = false

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    function validateInputs(): boolean {
        isValid = true
        
        if (!email.includes('@') || email.trim().length < 8) {
            isValid = false
        }

        if (password.includes(' ') || password.length < 8) {
            isValid = false 
        }

        return isValid
    }

    async function onLogin() {

        const users = await getUsers()
        const user = users.find((u) => u.email === email && u.password === password);
        if (user){
            assignUser(user);
        }
    }

    async function onSignup() {
        if (!validateInputs()) {
            return
        }

        // get users
        const users = await getUsers()

        // create user object
        const newUser: User = {
            id: users.length+1,
            email: email,
            password: password
        }

        // check if user exists
        users.forEach((u: User) => {
            if (u.email.toLowerCase().trim() === newUser.email.toLowerCase().trim()) {
                exists = true
            }
        })
        
        if (exists) {
            console.log("User already exists")
        }
        else {
            // post new User
            await postUser(newUser)
            // set user to newUser
            assignUser(newUser)
            // update exists to false for next time
            exists = false 
        }
    }

    async function onUpdate() {
        if (!editUser) {
            return
        }

        if (!validateInputs()) {
            editFlag(null)
            return
        }

        // create user object
        const newUser: User = {
            id: editUser.id,
            email: email,
            password: password
        }

        // get users
        const users = await getUsers()

        // check if user exists
        users.forEach((u: User) => {
            if ((u.email.toLowerCase().trim() === newUser.email.toLowerCase().trim()) && (u.id !== newUser.id)) {
                exists = true
            }
        })

        // check if same password and same email
        if ((editUser.email.toLowerCase().trim() === newUser.email.toLowerCase().trim()) &&(editUser.password.trim() === newUser.password.trim())) {
            exists = true
        }
        
        if (exists) {
            console.log("This user already exists!")
        }
        else {
            // update with newUser
            await putUser(newUser)
            // set user to newUser
            assignUser(newUser)
            // update exists to false for next time
            exists = false 
            editFlag(null)
        }
    }

    return(
        <div className='flex justify-center items-center bg-slate-500 text-white min-h-screen'>
            <form onSubmit = {handleSubmit}>
                <fieldset className='flex flex-col p-4 border-2 border-slate-50 text-center'>
                    {editUser
                    ? <legend >Edit Details</legend>
                    : <legend >Login / Sign-up</legend>
                    }
                    <label htmlFor="emailInput">Email</label>
                    <input className="text-black bg-amber-50 m-1" id="emailInput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="passwordInput">Password</label>
                    <input className='text-black bg-amber-50 m-1' id="passwordInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {editUser
                    ? <>
                        <button type="submit" onClick={onUpdate}>Save</button>
                    </>
                    : <>
                        <button className="m-2 px-3 bg-blue-900 rounded-lg border-2 border-amber-50 hover:bg-blue-400" type="submit" onClick={onLogin}>Login</button>
                        <button className="m-2 px-3  bg-blue-900 rounded-lg border-2 border-amber-50 hover:bg-blue-400" type="submit" onClick={onSignup}>Sign-up</button>
                    </>
                    }
                </fieldset>
            </form>
        </div>
    )
}