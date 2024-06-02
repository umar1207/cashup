import Image from 'next/image'
import { FcBarChart } from "react-icons/fc"
import { IoMdLogOut } from "react-icons/io"

function Nav(){
    return (
        <header className='container max-w-2xl mx-auto px-6 py-6'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
                        <Image
                            src="https://i.pinimg.com/564x/1d/57/4b/1d574b563a4e69f332366a6610a0d6e5.jpg"
                            width={40}
                            height={40}
                            alt='user-photo'
                            className='object-cover w-full h-full'
                        />
                    </div>
                    <div className=''>
                        <medium>Hey, Umar</medium>
                    </div>
                </div>

                <nav className='flex items-center gap-2'>
                    <div>
                        <button className='btn'>
                            <FcBarChart
                                className='text-2xl'
                            />
                        </button>
                    </div>
                    <div>
                        <button className='btn'>
                            <IoMdLogOut
                                className='text-2xl text-red-600'
                            />
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Nav