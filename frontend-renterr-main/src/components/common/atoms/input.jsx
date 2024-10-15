import React from 'react'

const Input = ({ label, placeholder, onChange, value, type, name, multiple }) => {
    return (
        <div className='flex flex-col gap-3'>
            <p className='text-sm text-[#100F14] font-semibold'>{label}</p>
            <input multiple={multiple} value={value} name={name} type={type ? type : "text"} className='focus-within:border-[#400CFA] outline-none border border-[#ECECEC] placeholder:text-[#706F72] text-[#100F14] rounded-lg px-5 py-3' placeholder={placeholder} onChange={onChange} />
        </div>
    )
}

export default Input