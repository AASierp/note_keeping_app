import { useState } from 'react'
import { type User } from '../types/types.ts'
import { getUsers, postUser } from '../services/usersService.ts'

interface LandingProps {
    assignUser: (user: User | null) => void
}
export function Landing({ assignUser }: LandingProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let exists: boolean = false
    let isValid: boolean = false

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("submit")
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

    return(
        <div>
        Login | Sign Up 

        <form onSubmit = {handleSubmit}> {/* Create New Note */}
            <fieldset>
                <legend>Login / Sign-up</legend>
                <label htmlFor="emailInput">Email</label>
                <input id="emailInput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="passwordInput">Password</label>
                <input id="passwordInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" onClick={onLogin}>Login</button>
                <button type="submit" onClick={onSignup}>Sign-up</button>
            </fieldset>
        </form>

        {/* Check if the password is correct for login */}
        {/* check if username includes @ */}
        {/* Hide password after we get it functional */}
        </div>
    )
}