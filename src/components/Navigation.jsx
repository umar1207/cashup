import Image from 'next/image'
import { FcBarChart } from "react-icons/fc"
import { IoMdLogOut } from "react-icons/io"
import { authContext } from '@/lib/store/authContext'
import { useContext } from 'react'

function Nav() {

    const { user, loading, logout } = useContext(authContext)
    return (
        <header className='container max-w-2xl mx-auto px-6 py-6'>
            <div className='flex items-center justify-between'>
                {user && !loading && (
                    <div className='flex items-center gap-3'>
                        <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className='object-cover w-full h-full'
                                referrerPolicy='no-referrer'
                            />
                        </div>
                        <div className=''>
                            <medium>Hey, {user.displayName}</medium>
                        </div>
                    </div>
                )}
                {user && !loading && (
                    <nav className='flex items-center gap-2'>
                        <div>
                            <button className='btn'>
                                <FcBarChart
                                    className='text-2xl'
                                />
                            </button>
                        </div>
                        <div>
                            <button className='btn' onClick={logout}>
                                <IoMdLogOut
                                    className='text-2xl text-red-600'
                                />
                            </button>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Nav