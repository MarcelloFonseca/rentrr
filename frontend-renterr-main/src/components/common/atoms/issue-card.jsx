import React from 'react'
import Svgs from 'svgs'
import { base_url } from 'utils'

const IssueCard = ({ data }) => {
  return (
    <div className='bg-white rounded-lg flex flex-col gap-3 px-5 py-3 text-sm'>
      <div>
        <div className='flex items-center justify-between gap-4'>
          <p className='text-[#706F72]'>#3987544 • Complaint <span className='text-xs'>({data?.category})</span></p>
          <Svgs.ThreeDots />
        </div>
        <div>
          <h1 className='text-xl font-semibold'>{data?.requestTitle}</h1>
          <div className='flex items-center gap-2 text-[#706F72]'>
            {/* <Svgs.Location /> */}
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <div className='flex gap-3 h-[15rem]'>
        <div className='flex-1'>
          <img
            loading='lazy'
            src={
              data?.images?.length
                ? `${base_url}${data.images[0].replace(/\\/g, '/')}`
                : `https://placehold.co/600x400?text=${(data?.requestTitle).replace(/ /g, "+")}`
            }
            className="h-full w-full object-cover rounded-md"
          />

        </div>
        {/* <div className='flex-1 grid grid-rows-2 gap-3'>
          <img src="https://picsum.photos/400/500/" className="h-full w-full object-cover rounded-md" />
          <img src="https://picsum.photos/400/500/" className="h-full w-full object-cover rounded-md" />
        </div> */}
      </div>
      <div>
        <div className='text-[#C38C23] bg-[#FFF3DC] w-fit text-sm px-4 py-2 rounded-full'>{data?.urgencyLevel}</div>
      </div>
    </div>
  )
}

export default IssueCard