import React from 'react'

const Avatar = ({ onClick, name, icon, className }) => {
    return (
        <div
            onClick={onClick}
            title={name}
            className={`cursor-pointer border rounded-full h-[3.5rem] w-[3.5rem] flex items-center justify-center hover:bg-gray-100 transition-all ${className}`}>
            {icon}
        </div>
    )
}

export default Avatar