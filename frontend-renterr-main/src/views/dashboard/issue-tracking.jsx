import Avatar from 'components/common/atoms/avatar'
import IssueCard from 'components/common/atoms/issue-card'
import DashboardLayout from 'components/layout/dashboard-layout'
import React, { useEffect, useState } from 'react'
import Svgs from 'svgs'
import { getDataFromLocalStorage, getMaintenanceRequest } from 'utils'

const IssueTracking = () => {
    const [data, setData] = useState([]);
    const [Type, setType] = useState(getDataFromLocalStorage()?.role);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            const getall = await getMaintenanceRequest({ type: Type });
            setData(getall?.data);
            setLoading(false)
        };
        getData();

    }, [])

    console.log(Type, "Type");
    return (
        <DashboardLayout type={Type} active={"File"}>
            <div className="px-3 md:px-6 pb-4">
                <header className="flex items-center justify-between flex-wrap gap-3 py-6 border-t border-gray-300">
                    <div>
                        <h1 className="text-2xl font-bold">Maintenance and Issue Tracking </h1>
                        <p className="text-sm text-gray-600">Last Update 7:15 PM 23 Jun, 2024</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        <Avatar icon={<div className='flex items-center gap-2'>
                            <Svgs.GridView />
                            <p className='text-sm text-[#100F14] font-semibold'>Grid View</p>
                            <Svgs.ListView />
                        </div>} className={'!bg-white !border-none !h-[3rem] !w-fit px-2.5'} />
                        <Avatar icon={<div className='flex items-center gap-2'>
                            <Svgs.Filter />
                            <p className='text-sm text-[#100F14] font-semibold'>Filters</p>
                            <Svgs.ChevronDown />
                        </div>} className={'!bg-white !border-none !h-[3rem] !w-fit px-2.5'} />
                    </div>
                </header>
                <div className='grid grid-cols-4 gap-[2rem]'>
                    {
                        !Loading ? <>
                            {
                                data?.map(items => <IssueCard data={items} />)
                            }
                        </> : "Loading ..."
                    }

                </div>
            </div>
        </DashboardLayout>
    )
}

export default IssueTracking