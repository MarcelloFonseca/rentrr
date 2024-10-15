import React, { useEffect, useState } from 'react'
import Svgs from 'svgs'
import Avatar from '../atoms/avatar'
import { getDataFromLocalStorage } from 'utils';

const Header = () => {
    const [HeaderData, setHeaderData] = useState({});
    useEffect(() => {
        const data = getDataFromLocalStorage();
        if (data) {
            setHeaderData(data);
        }
    }, []);

    return (
        <div className='sticky top-0 left-0 right-0 px-2 md:px-6 py-4 border-b border-gray-100 bg-[#f1f2f8] flex items-center justify-between'>
            <div className='flex items-start gap-3'>
                <div>
                    <img src={process.env.PUBLIC_URL + "assets/images/avatar.png"} alt="" className='h-[3.5rem] object-contain' />
                </div>
                <div className='lg:block hidden'>
                    <div>
                        <h1 className="text-xl">Hey, <span className='font-bold'>{HeaderData?.fullName ? HeaderData?.fullName : "---"}</span></h1>
                        <p className="text-sm text-[#706F72] font-semibold">Track maintenance behavior</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='bg-white lg:flex hidden items-center gap-3 rounded-full pl-3 pr-2 py-2 '>
                    <Svgs.Search />
                    <input type="text" className='border-none outline-none' placeholder='Search Something...' />
                    <div className='bg-black px-4 py-2 rounded-full text-white flex items-center gap-1 text-sm'>
                        <Svgs.Command />
                        <span>+ K</span>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <Avatar icon={<Svgs.Notification />} className={'!bg-white !border-none !h-[3rem] !w-[3rem]'} />
                    <Avatar icon={<div className='flex items-center gap-2'>
                        <Svgs.LightMode />
                        <Svgs.DarkMode />
                    </div>} className={'!bg-white !border-none !h-[3rem] !w-fit px-2'} />
                    <Avatar icon={<div className='flex items-center gap-2'>
                        <Svgs.Settings />
                        <p className='text-sm text-[#100F14] font-semibold'>Settings</p>
                        <Svgs.ChevronDown />
                    </div>} className={'!bg-white !border-none !h-[3rem] !w-fit px-2'} />
                </div>
            </div>
        </div>
    )
}

export default Header