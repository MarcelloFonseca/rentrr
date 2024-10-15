import React from 'react'
import Svgs from 'svgs'

const Steps = ({ active }) => {
    return (
        <div className='w-full rounded-full border border-[#ECECEC] px-3 py-2 flex items-center gap-[1rem]'>
            <div className={`whitespace-nowrap flex items-center gap-1 ${active == 1 && "text-[#400CFA]"}`}>
                {
                    active >= 1 ? <Svgs.CheckFilled /> : <Svgs.Check />
                }
                <div>
                    Step 1
                </div>
            </div>
            <div className={`${active >= 1 ? "bg-[#400CFA]" : "bg-[#ECECEC]"} h-[2px] w-full`}></div>
            <div className={`whitespace-nowrap flex items-center gap-1 ${active == 2 && "text-[#400CFA]"}`}>
                {
                    active == 2 ? <Svgs.CheckFilled /> : <Svgs.Check />
                }
                <div>
                    Step 2
                </div>
            </div>
        </div>
    )
}

export default Steps