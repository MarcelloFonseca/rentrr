import Input from 'components/common/atoms/input'
import DashboardLayout from 'components/layout/dashboard-layout'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Svgs from 'svgs'
import { getDataFromLocalStorage, linkProperty } from 'utils'

const TenantProfile = () => {
  const [LinkProperty, setLinkProperty] = useState("");
  useEffect(() => {
    if (getDataFromLocalStorage()) {
      if (getDataFromLocalStorage()?.role != "tenant") {
        window.location.href = `/${getDataFromLocalStorage()?.role}-dashboard`;
      }
    } else {
      window.location.href = '/login';
    }
  }, [])

  const handleSubmit = async () => {
    try {
      const response = await linkProperty({ "uniquePropertyCode": LinkProperty });
      toast.success("Link request sent successfully!");
      console.log(response, "response");
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
    <DashboardLayout active="User">
      <div className="px-3 md:px-6 pb-4">
        <header className="flex items-center justify-between flex-wrap gap-3 py-6 border-t border-gray-300">
          <div>
            <h1 className="text-2xl font-bold">Tenant profile </h1>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              className='bg-[#FFFFFFCC] rounded-full px-[3rem] py-3 text-[#706F72] flex items-center justify-center gap-3'
            >
              <p>Cancel</p>
            </button>
            <button
              className='bg-[#4859F2] rounded-full px-[3rem] py-3 text-white flex items-center justify-center gap-3'
            >
              <p>Save</p>
            </button>
          </div>
        </header>
        <div className='grid lg:grid-cols-8 grid-cols-1 gap-5'>
          <div className='bg-white px-6 py-5 rounded-xl flex flex-col gap-3 col-span-6'>
            <div className='mb-3'>
              <img className='rounded-md h-[5rem] w-[5rem] mb-2 object-cover' src='https://picsum.photos/500/500/' />
              <h1 className='text-xl font-semibold'>Elisha Atif</h1>
              <h1 className='text-[#706F72] text-sm font-semibold'>elishaatif456@gmail.com</h1>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
              <Input placeholder={"Enter Name..."} label={"Name"} />
              <Input placeholder={"Enter Email..."} label={"City"} />
              <Input placeholder={"Enter Phone number..."} label={"Phone number"} />
            </div>
          </div>
          <div className='bg-white px-6 py-5 rounded-xl flex flex-col gap-3 col-span-2 h-fit'>
            <h1 className='text-xl font-semibold'>Want to connect with landlord?</h1>
            <p className='text-sm text-[#706F72]'>Enter the unique property code from the landlord in order to connect</p>
            <Input value={LinkProperty} onChange={(e) => setLinkProperty(e.target.value)} placeholder={"Enter unique property code..."} />
            <button
              onClick={handleSubmit}
              className='bg-[#400CFA] rounded-full px-[3.5rem] py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-3'
            >
              <p>Connect Landlord</p>
              <div>
                <Svgs.Arrow />
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TenantProfile