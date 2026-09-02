import { type NavBarProps } from '../types/types'

export function NavBar({ user, logOut, editFlag }: NavBarProps) {

    return (
        <nav className=' bg-[#333] text-white border-b-2 border-green-800'>
            {user
            ? <ul className='flex justify-end'>
                <li><button className="m-2 px-3 bg-blue-900 rounded-lg border-2 border-amber-50 hover:bg-blue-400" onClick={() => editFlag(user)}>Edit Profile</button></li>
                <li><button className="m-2 px-3 bg-blue-900 rounded-lg border-2 border-amber-50 hover:bg-blue-400" onClick={logOut}>Logout</button></li>
            </ul>
            : <></>
            }
        </nav>
    )
}