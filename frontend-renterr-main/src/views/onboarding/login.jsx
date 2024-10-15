import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from 'components/common/atoms/input';
import Onboarding from 'components/layout/onboarding';
import Svgs from 'svgs';
import toast from 'react-hot-toast';
import { userLogin } from 'utils';

const Login = () => {
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await userLogin(formData);
            toast.success("Logged in successfully!");
            console.log(response, "response");
            localStorage.setItem("userData", JSON.stringify(response))
            setLoading(false)
            if (response?.data?.role == "landlord") {
                navigate("/landlord-dashboard")
            } else {
                navigate("/tenant-dashboard")
            }
        } catch (error) {
            setLoading(false)
            console.error('Login failed:', error);
        }
    };

    return (
        <Onboarding>
            <div className='flex flex-col gap-[1.5rem] w-[80%] mx-auto pt-[6rem] pb-[2rem] h-full'>
                <div className='flex flex-col gap-3 text-center'>
                    <div className='flex items-center justify-center gap-2'>
                        <h1 className='font-semibold text-2xl'>Welcome Back</h1>
                        <div className='h-fit pb-1'>
                            <img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="" className='h-[1.5rem] object-contain' />
                        </div>
                    </div>
                    <p className='text-[#706F72]'>Please login to proced.</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <Input
                        type="email"
                        label="Email Address"
                        placeholder="Enter your Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter your Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div className='flex items-center justify-center'>
                        <button
                            disabled={Loading}
                            onClick={handleSubmit}
                            className='disabled:bg-[#400cfa5b] bg-[#400CFA] rounded-full px-[3.5rem] py-4 text-white flex items-center justify-center gap-3'
                        >
                            <p>Login</p>
                            <div>
                                <Svgs.Arrow />
                            </div>
                        </button>
                    </div>
                    <p className='text-center font-semibold text-sm'>Don't have an account? <span className='text-[#400CFA] cursor-pointer hover:underline' onClick={() => navigate("/")}>Signup</span></p>
                </div>
            </div>
        </Onboarding >
    );
};

export default Login;
