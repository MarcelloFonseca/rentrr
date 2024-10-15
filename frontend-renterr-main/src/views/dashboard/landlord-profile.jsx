import React, { useEffect, useState } from 'react';
import Avatar from 'components/common/atoms/avatar';
import Input from 'components/common/atoms/input';
import DashboardLayout from 'components/layout/dashboard-layout';
import { customAlphabet } from 'nanoid';
import Svgs from 'svgs';
import toast from 'react-hot-toast';
import { addProperty, getDataFromLocalStorage } from 'utils';

const LandlordProfile = () => {
    const nanoid = customAlphabet('1234567890abcdefghijk', 10);
    const [PropertyType, setPropertyType] = useState("Apartment");
    const [postalCode, setPostalCode] = useState("");
    const [uniqueCode, setUniqueCode] = useState("");
    useEffect(() => {
        if (getDataFromLocalStorage()) {
            if (getDataFromLocalStorage()?.role != "landlord") {
                window.location.href = `/${getDataFromLocalStorage()?.role}-dashboard`;
            }
        } else {
            window.location.href = '/login';
        }
    }, [])

    useEffect(() => {
        formData.uniquePropertyCode = uniqueCode;
        formData.propertyType = PropertyType.toLocaleLowerCase();
    }, [PropertyType, uniqueCode]);

    const [formData, setFormData] = useState({
        "city": "",
        "state": "",
        "zipCode": "",
        "streetAddress": "",
        "country": "",
        "propertyType": "",
        "uniquePropertyCode": ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await addProperty(formData);
            toast.success("Property Created successfully!");
            clearAll();
            console.log(response, "response");
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const generateUniqueCode = (code) => {
        const id = nanoid(16);
        return `${code}-${id}`;
    };

    const handlePostalCodeChange = (e) => {
        const code = e.target.value;
        setPostalCode(code);
        if (code) {
            setUniqueCode(generateUniqueCode(code));
        } else {
            setUniqueCode("");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uniqueCode)
            .then(() => {
                toast.success("Unique code copied to clipboard!");
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast.error("Failed to copy unique code.");
            });
    };

    const clearAll = () => {
        setFormData({
            "city": "",
            "state": "",
            "zipCode": "",
            "streetAddress": "",
            "country": "",
            "propertyType": "",
            "uniquePropertyCode": ""
        });
        setPostalCode("")
    }

    return (
        <DashboardLayout active={"User"}>
            <div className="px-3 md:px-6 pb-4">
                <header className="flex items-center justify-between flex-wrap gap-3 py-6 border-t border-gray-300">
                    <div>
                        <h1 className="text-2xl font-bold">Landlord profile</h1>
                        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            onClick={clearAll}
                            className='bg-[#FFFFFFCC] rounded-full px-[3rem] py-3 text-[#706F72] flex items-center justify-center gap-3'
                        >
                            <p>Cancel</p>
                        </button>
                        <button onClick={handleSubmit}
                            className='bg-[#4859F2] rounded-full px-[3rem] py-3 text-white flex items-center justify-center gap-3'
                        >
                            <p>Save</p>
                        </button>
                    </div>
                </header>
                <div className='bg-white px-6 py-5 rounded-xl flex flex-col gap-3'>
                    <div>
                        <h1 className='text-xl font-semibold'>Property Address</h1>
                    </div>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                        <Input onChange={handleChange} value={formData.streetAddress} name={"streetAddress"} placeholder={"Enter Street Address..."} label={"Street Address"} />
                        <Input onChange={handleChange} value={formData.city} name={"city"} placeholder={"Enter City..."} label={"City"} />
                        <Input onChange={handleChange} value={formData.state} name={"state"} placeholder={"Enter State/Province..."} label={"State/Province"} />
                        <Input onChange={handleChange} value={formData.zipCode} name={"zipCode"} placeholder={"Enter Zip/Postal Code..."} label={"Zip/Postal Code"} />
                        <Input onChange={handleChange} value={formData.country} name={"country"} placeholder={"Enter Country..."} label={"Country"} />
                    </div>
                    <hr className='border border-[#E0E0E0] my-3' />
                    <h1 className='text-xl font-semibold'>Property Type</h1>
                    <div className='flex items-center gap-3 flex-wrap'>
                        {
                            // "apartment", "house", "condo", "townhouse", "duplex", "studio"
                            ["Apartment", "House", "Condo", "Townhouse", "Duplex", "Studio"].map(ele => (
                                <button
                                    key={ele}
                                    onClick={() => setPropertyType(ele)}
                                    className={`${ele === PropertyType ? "bg-[#100F14] text-white" : "text-[#100F14] bg-[#FAFAFA]"} rounded-full px-6 text-sm py-3 flex items-center justify-center gap-3`}
                                >
                                    <p>{ele}</p>
                                </button>
                            ))
                        }
                    </div>
                    <hr className='border border-[#E0E0E0] my-3' />
                    <div>
                        <h1 className='text-xl font-semibold'>Unique Property Code</h1>
                    </div>
                    <div className=''>
                        <div className='w-fit flex flex-col gap-2'>
                            <div className='flex items-end gap-2'>
                                <Input
                                    placeholder={"Enter zip/postal code..."}
                                    value={postalCode}
                                    onChange={handlePostalCodeChange}
                                />
                                <div
                                    className='bg-[#F0ECFF] rounded-md h-[3rem] w-[3rem] flex items-center justify-center cursor-pointer'
                                    onClick={copyToClipboard}
                                >
                                    <Svgs.Clipboard />
                                </div>
                            </div>
                            <div className='text-right'>
                                <p
                                    className='text-sm underline cursor-pointer font-semibold'
                                    onClick={() => setUniqueCode(generateUniqueCode(postalCode))}
                                >
                                    Regenerate Unique code
                                </p>
                            </div>
                        </div>
                        {uniqueCode && (
                            <p className='text-sm mt-2'>Generated Code: {uniqueCode}</p>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default LandlordProfile;
