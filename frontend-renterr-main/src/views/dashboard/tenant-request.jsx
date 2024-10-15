import React, { useEffect, useState } from 'react';
import Input from 'components/common/atoms/input';
import DashboardLayout from 'components/layout/dashboard-layout';
import { getDataFromLocalStorage, sendMaintenanceRequest } from 'utils';
import toast from 'react-hot-toast';

const TenantRequest = () => {

    useEffect(() => {
        if (getDataFromLocalStorage()) {
            if (getDataFromLocalStorage()?.role !== "tenant") {
                window.location.href = `/${getDataFromLocalStorage()?.role}-dashboard`;
            }
        } else {
            window.location.href = '/login';
        }
    }, []);

    const [formData, setFormData] = useState({
        requestTitle: '',
        description: '',
        phoneNumber: '',
        category: '',
        urgencyLevel: '',
        preferredContactMethod: '',
        permissionToEnter: '',
        dateOfIssue: '',
        images: []
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setFormData({
                ...formData,
                images: files
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async () => {
        const requestData = new FormData();

        // Append text fields to FormData
        for (const key in formData) {
            if (key !== 'images') {
                if (key == "permissionToEnter") {
                    requestData.append(key, formData[key] == "Yes" ? true : false);
                } else {
                    requestData.append(key, formData[key]);
                }
            }
        }

        // Append images to FormData
        if (formData.images.length > 0) {
            Array.from(formData.images).forEach(file => {
                requestData.append('images', file);
            });
        }

        try {
            const response = await sendMaintenanceRequest(requestData);
            toast.success("Maintenance request sent successfully!");
            console.log(response, "response");
        } catch (error) {
            console.error('Request failed:', error);
            toast.error("Failed to send maintenance request.");
        }
    };

    return (
        <DashboardLayout>
            <div className="px-3 md:px-6 pb-4">
                <header className="flex items-center justify-between flex-wrap gap-3 py-6 border-t border-gray-300">
                    <div>
                        <h1 className="text-2xl font-bold">Tenant Request</h1>
                        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            className='bg-[#FFFFFFCC] rounded-full px-[3rem] py-3 text-[#706F72] flex items-center justify-center gap-3'
                        >
                            <p>Cancel</p>
                        </button>
                        <button
                            onClick={handleSubmit}
                            className='bg-[#4859F2] rounded-full px-[3rem] py-3 text-white flex items-center justify-center gap-3'
                        >
                            <p>Save</p>
                        </button>
                    </div>
                </header>
                <div className='bg-white px-6 py-5 rounded-xl flex flex-col gap-3 col-span-6'>
                    <h1 className='text-xl font-bold mb-2'>Tenant Request Submission</h1>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                        <Input
                            placeholder={"Enter Title..."}
                            name={"requestTitle"}
                            label={"Title"}
                            value={formData.requestTitle}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder={"Enter Description..."}
                            name={"description"}
                            label={"Description"}
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder={"Enter Phone number..."}
                            name={"phoneNumber"}
                            label={"Phone number"}
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder={"Enter Date Of Issue..."}
                            name={"dateOfIssue"}
                            label={"Date Of Issue"}
                            value={formData.dateOfIssue}
                            onChange={handleChange}
                        />
                        <div className='flex flex-col gap-3'>
                            <p className='text-sm text-[#100F14] font-semibold'>Category</p>
                            <select
                                className='focus-within:border-[#400CFA] outline-none border border-[#ECECEC] placeholder:text-[#706F72] text-[#100F14] rounded-lg px-5 py-3'
                                name="category"
                                onChange={handleChange}
                            >
                                <option disabled selected>Select Category</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Heating">Heating</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-sm text-[#100F14] font-semibold'>Urgency Level</p>
                            <select
                                className='focus-within:border-[#400CFA] outline-none border border-[#ECECEC] placeholder:text-[#706F72] text-[#100F14] rounded-lg px-5 py-3'
                                name="urgencyLevel"
                                onChange={handleChange}
                            >
                                <option disabled selected>Select Urgency Level</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-sm text-[#100F14] font-semibold'>Preferred Contact Method</p>
                            <select
                                className='focus-within:border-[#400CFA] outline-none border border-[#ECECEC] placeholder:text-[#706F72] text-[#100F14] rounded-lg px-5 py-3'
                                name="preferredContactMethod"
                                onChange={handleChange}
                            >
                                <option disabled selected>Select Contact Method</option>
                                <option value="Phone">Phone</option>
                                <option value="Email">Email</option>
                                <option value="In-app Message">In-app Message</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-sm text-[#100F14] font-semibold'>Permission To Enter</p>
                            <select
                                className='focus-within:border-[#400CFA] outline-none border border-[#ECECEC] placeholder:text-[#706F72] text-[#100F14] rounded-lg px-5 py-3'
                                name="permissionToEnter"
                                value={formData.permissionToEnter}
                                onChange={handleChange}
                            >
                                <option disabled selected>Select Permission</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <Input
                            placeholder={"Enter Images..."}
                            type={"file"}
                            name={"images"}
                            label={"Images"}
                            onChange={handleChange}
                            multiple
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TenantRequest;
