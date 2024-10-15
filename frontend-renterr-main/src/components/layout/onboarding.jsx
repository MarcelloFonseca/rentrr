import React from 'react'
import Svgs from 'svgs'

const Onboarding = ({ children }) => {
    return (
        <div className='bg-[#f1f2f8] min-h-screen p-[2rem] md:p-[4rem] flex flex-col'>
            <div className='container md:w-[85%] mx-auto rounded-xl grid md:grid-cols-2 grid-cols-1 md:overflow-hidden flex-1'>
                <div className='bg-white md:overflow-auto'>{children}</div>
                <div className='relative md:h-auto min-h-[30rem]'>
                    <div className='absolute inset-0 z-10 bg-gradient-signup'></div>
                    <div className='absolute inset-0 top-[30%] z-20 bg-signup'></div>
                    <div className='absolute top-0 left-0 right-0 z-30 flex items-center md:items-start justify-between md:flex-row flex-col gap-[1rem] p-[1.5rem] text-white'>
                        <div className='p-[1rem] bg-[#FFFFFF38] backdrop-blur rounded-xl flex flex-col gap-3'>
                            <h1 className='font-semibold text-xl'>
                                " We Envision a World <br /> with no Limits "
                            </h1>
                            <p className=''>Andrea Stella</p>
                        </div>
                        <div className='px-4 py-2 bg-[#FFFFFF38] backdrop-blur rounded-full flex items-center gap-3'>
                            <div>
                                <Svgs.Lock />
                            </div>
                            <p className=''>Your privacy is our priority</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Onboarding