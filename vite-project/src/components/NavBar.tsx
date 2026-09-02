import { type NavBarProps } from '../types/types'

export function NavBar({ user, logOut, editFlag }: NavBarProps) {

    return (
        <nav className='border-2 border-amber-600'>
            {user
            ? <ul>
                <li><button onClick={logOut}>Logout</button></li>
                <li><button onClick={() => editFlag(user)}>Edit Profile</button></li>
            </ul>
            : <></>
            }
        </nav>
    )
}