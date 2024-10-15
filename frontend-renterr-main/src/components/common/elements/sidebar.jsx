import { sidebar_data } from 'data/common/sidebar'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Svgs from 'svgs';
import Avatar from '../atoms/avatar';
import { getDataFromLocalStorage } from 'utils';

const Sidebar = ({ type, active }) => {
  const navigate = useNavigate();
  const [Type, setType] = useState(getDataFromLocalStorage()?.role);
  return (
    <div className='px-3 py-4 flex flex-col gap-4 justify-between overflow-auto'>
      <div className='flex flex-col gap-[2.5rem]'>
        <div>
          <img src={process.env.PUBLIC_URL + "assets/images/logo-sm.png"} alt="" className='cursor-pointer h-[3.5rem] w-[3.5rem] object-contain' />
        </div>
        <div className='flex flex-col gap-3'>
          {
            sidebar_data.map(item => {
              return <Avatar className={item.name == active && "!bg-[#400cfa] text-white"} icon={item.icon} name={item.name} onClick={() => {
                if (item.name == "User") {
                  navigate(`/${Type}-profile`)
                } else if (item.path != "") {
                  navigate(item.path)
                } else {
                  navigate(`/${Type}-dashboard`)
                }
              }} />
            })
          }
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <Avatar icon={<Svgs.Settings />} />
        <Avatar onClick={() => {
          localStorage.clear();
          navigate("/login")
        }} icon={<Svgs.Logout />} />
      </div>
    </div >
  )
}

export default Sidebar