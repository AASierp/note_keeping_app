import { type NavBarProps } from '../types/types'

export function NavBar({ user, logOut, editFlag }: NavBarProps) {

    return (
        <nav>
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