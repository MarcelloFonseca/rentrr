import Avatar from "components/common/atoms/avatar"
import DashboardLayout from "components/layout/dashboard-layout"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Svgs from "svgs"
import { getDataFromLocalStorage, getMaintenanceRequest } from "utils"


const Home = ({ type }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        if (getDataFromLocalStorage()) {
            if (getDataFromLocalStorage()?.role != type) {
                window.location.href = `/${getDataFromLocalStorage()?.role}-dashboard`;
            }
        } else {
            window.location.href = '/login';
        }
    }, [])

    useEffect(() => {
        const getData = async () => {
            const getall = await getMaintenanceRequest({ type });
            setData(getall?.data);
            setLoading(false)
        };
        getData();
    }, [])
    return (
        <DashboardLayout type={type} active={"dashboard"}>
            <div className="px-3 md:px-6 pb-4">
                <header className="flex items-center justify-between flex-wrap gap-3 py-6 border-y border-gray-300">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-sm text-gray-600">Last Update 7:15 PM 23 Jun, 2024</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        {
                            type == "tenant" && <button
                                onClick={() => navigate("/tenant-request")}
                                className='bg-[#4859F2] rounded-full px-[2rem] py-3 text-sm text-white flex items-center justify-center gap-3'
                            >
                                Create Request
                            </button>
                        }
                        <Avatar icon={<div className='flex items-center gap-2'>
                            <Svgs.Filter />
                            <p className='text-sm text-[#100F14] font-semibold'>This month vs. last month</p>
                            <Svgs.ChevronDown />
                        </div>} className={'!bg-white !border-none !h-[3rem] !w-fit px-2.5'} />
                        <Avatar icon={<div className='flex items-center gap-2'>
                            <Svgs.Filter />
                            <p className='text-sm text-[#100F14] font-semibold'>Filters</p>
                            <Svgs.ChevronDown />
                        </div>} className={'!bg-white !border-none !h-[3rem] !w-fit px-2.5'} />
                    </div>
                </header>

                <main className="lg:grid flex flex-col grid-cols-3 gap-6 pt-6">
                    <div className="col-span-2 bg-white rounded-xl">
                        <div className="flex justify-between items-center p-4 border-b border-gray-300">
                            <h2 className="text-lg font-bold">Recent Documents</h2>
                            <p className="text-sm text-gray-600">Last Update 7:15 PM 23 Jun, 2024</p>
                        </div>
                        <div className="overflow-auto">
                            <div className="grid grid-cols-[repeat(6,minmax(10rem,1fr))] gap-4 bg-[#F5F5F6] text-sm px-5 py-4 font-semibold text-[#706F72] min-w-full lg:w-full w-max">
                                <p>Property Name</p>
                                <p>Location</p>
                                <p>Status</p>
                                <p>Added On</p>
                                <p>Document Type</p>
                                <p>Action    </p>
                            </div>
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="grid grid-cols-[repeat(6,minmax(10rem,1fr))] gap-4 border-b rounded px-4 py-3 items-center min-w-full lg:w-full w-max">
                                    <p className="font-semibold">Mansion Wooden</p>
                                    <p className="text-sm font-semibold">3 Pearl Street, Bristol</p>
                                    <div>
                                        <p className="w-fit bg-[#FFF3DC] text-xs text-[#C38C23] px-3 py-1.5 rounded-full">In Review</p>
                                    </div>
                                    <div className="text-sm font-semibold">24 Jun, 2024</div>
                                    <div className="text-sm text-gray-600 flex items-center gap-3">
                                        <div>
                                            <Svgs.DocumentType />
                                        </div>
                                        <div>
                                            <p className="text-black font-semibold">Insurance.PDF</p>
                                            <p>22 MB - 5 Pages</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Svgs.Pencil />
                                        <Svgs.View />
                                    </div>
                                </div>
                            ))}
                            <div className="text-[#6C44FB] flex items-center gap-1 justify-center py-3 cursor-pointer text-sm">
                                <p>
                                    View All
                                </p>
                                <div>
                                    <Svgs.Arrow fill={"#6C44FB"} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl">
                        <div className="p-4 flex items-center justify-between gap-4 border-b">
                            <h2 className="text-lg font-bold border-gray-300">Inbox <span className="font-normal text-sm">(295 unread)</span></h2>
                            <div class="text-[#6C44FB] cursor-pointer text-sm underline"><p>View All</p></div>
                        </div>
                        <div className="bg-white rounded-b-xl">
                            {[...Array(3)].map((_, index) => (
                                <div className=" border-b px-4 py-3">
                                    <div key={index} className="flex justify-between items-start">
                                        <div>
                                            <div className="text-sm text-gray-600 flex items-center gap-3">
                                                <div>
                                                    <img src={process.env.PUBLIC_URL + "assets/images/avatar.png"} className="h-[3.5rem] w-[3.5rem] rounded-full object-contain" />
                                                </div>
                                                <div>
                                                    <p className="text-black text-lg font-semibold">Linda michzaosky</p>
                                                    <p>#3987544 • New Message</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600 whitespace-nowrap">8:45 PM</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
                <main className="lg:grid flex flex-col grid-cols-3 gap-6 pt-6">

                    <div className="bg-white rounded-xl">
                        <h2 className="text-lg font-bold p-4 border-b border-gray-300">Tasks</h2>
                        <div className="p-4 flex flex-col gap-4">
                            {[...Array(2)].map((_, index) => (
                                <div className="flex flex-col gap-3 rounded-xl border border-[#ECECEC]">
                                    <div key={index} className="flex justify-between items-center p-2">
                                        <div>
                                            <h1 className="font-semibold text-[#100F14]">Trouble with the Wi-Fi</h1>
                                        </div>
                                        <div>
                                            <Svgs.ThreeDots />
                                        </div>
                                    </div>
                                    <div className="px-2 flex items-center gap-3 text-sm font-semibold">
                                        <div className="flex items-center gap-1">
                                            <Svgs.Calendar />
                                            <p>24 Jun, 2024</p>
                                        </div>
                                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2" cy="2" r="2" fill="#B6B6B8" />
                                        </svg>
                                        <div className="flex items-center gap-1">
                                            <Svgs.Clock />
                                            <p>10:30 aM</p>
                                        </div>
                                    </div>
                                    <p className="px-2 text-sm text-[#706F72]">Lorem ipsum dolor sit amet, consectetur adipiscing  dolor sit ame elit abore et dolore magna aliqua.</p>
                                    <hr className="border-[#ECECED]" />
                                    <div className="px-2 pb-2 flex items-center justify-between gap-3">
                                        <div className="text-sm text-gray-600 flex items-center gap-3">
                                            <div>
                                                <img src={process.env.PUBLIC_URL + "assets/images/avatar.png"} className="h-[2.5rem] w-[2.5rem] rounded-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="text-black text-sm font-semibold">George Pu </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="w-fit bg-[#FFE6E6] text-xs text-[#F15D5D] px-3 py-1.5 rounded-full">High</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-2 bg-white rounded-xl">
                        <div className="flex justify-between items-center p-4 border-b border-gray-300">
                            <h2 className="text-lg font-bold">Maintenance Tracking</h2>
                        </div>
                        <div className="">
                            <div className="grid grid-cols-[repeat(5,minmax(10rem,1fr))] gap-4 bg-[#F5F5F6] text-sm px-5 py-4 font-semibold text-[#706F72] min-w-full lg:w-full w-max">
                                <p>Work Required</p>
                                <p>Resident</p>
                                <p>Property</p>
                                <p>Priority</p>
                                <p>Action    </p>
                            </div>
                            <div className="max-h-[21rem] overflow-auto">
                                {
                                    !Loading ? <>
                                        {data?.map((item, index) => (
                                            <div key={index} className="grid grid-cols-[repeat(5,minmax(10rem,1fr))] gap-4 border-b rounded px-4 py-3 items-center min-w-full lg:w-full w-max">
                                                <div className="text-sm text-gray-600 flex items-center gap-3">
                                                    <div>
                                                        <Avatar icon={<Svgs.I />} className={"h-[3rem] w-[3rem] bg-[#F2A55E33] !border-0"} />
                                                    </div>
                                                    <div>
                                                        <p className="text-black font-semibold">{item?.requestTitle}</p>
                                                        <p>#3987544 • Complaint</p>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-600 flex items-center gap-3">
                                                    <div>
                                                        <img src={process.env.PUBLIC_URL + "assets/images/avatar.png"} className="h-[2.5rem] w-[2.5rem] rounded-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <p className="text-black text-sm font-semibold">nico Robin</p>
                                                        <p>3 Pearl Street...</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Mansion Wooden</p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="4" cy="4.5" r="4" fill="#F15D5D" />
                                                        </svg>
                                                        <p className="font-semibold">{item?.urgencyLevel}</p>
                                                    </div>
                                                    <p className="text-[#706F72]">2 Days</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Svgs.Pencil />
                                                    <Svgs.View />
                                                </div>
                                            </div>
                                        ))}
                                    </> : ""
                                }
                            </div>
                            <div onClick={() => navigate("/maintenance-issue-tracking ")} className="text-[#6C44FB] flex items-center gap-1 justify-center py-3 cursor-pointer text-sm border-t">
                                <p>
                                    View All
                                </p>
                                <div>
                                    <Svgs.Arrow fill={"#6C44FB"} />
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </DashboardLayout>
    )
}

export default Home