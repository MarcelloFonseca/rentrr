import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from 'components/common/atoms/input';
import Steps from 'components/common/elements/steps';
import Onboarding from 'components/layout/onboarding';
import Svgs from 'svgs';
import { setUserAccountType, userSignup } from 'utils';
import toast from 'react-hot-toast';
import Avatar from 'components/common/atoms/avatar';

const Signup = () => {
    const navigate = useNavigate();
    const [formStep, setFormStep] = useState({ step: 1, id: null })
    const [Loading, setLoading] = useState(false)
    const [accountType, setAccountType] = useState("Tenant")
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
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
            const response = await userSignup(formData);
            toast.success("Account created successfully!");
            console.log(response, "response");
            // localStorage.setItem("userData", JSON.stringify(response))
            setLoading(false)
            setFormStep({ step: 2, id: response?.data?._id })
        } catch (error) {
            setLoading(false)
            console.error('Signup failed:', error);
        }
    };

    return (
        <Onboarding>
            <div className='flex flex-col gap-[1.5rem] w-[80%] mx-auto pt-[6rem] pb-[2rem] h-full'>
                <Steps active={formStep.step} />
                {
                    formStep.step == 1 ? <>
                        <div className='flex flex-col gap-3 text-center'>
                            <div className='flex items-center justify-center gap-2'>
                                <h1 className='font-semibold text-2xl'>Welcome To</h1>
                                <div className='h-fit pb-1'>
                                    <img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="" className='h-[1.5rem] object-contain' />
                                </div>
                            </div>
                            <p className='text-[#706F72]'>We need your personal information for applying the <br /> rental application form</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Input
                                label="First Name"
                                placeholder="Enter your first name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            <Input
                                type="email"
                                label="Email Address"
                                placeholder="Enter your Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <Input
                                type="number"
                                label="Phone Number"
                                placeholder="Enter your Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
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
                                    <p>Create An Account</p>
                                    <div>
                                        <Svgs.Arrow />
                                    </div>
                                </button>
                            </div>
                            <p className='text-center font-semibold text-sm'>Already Have an Account? <span className='text-[#400CFA] cursor-pointer hover:underline' onClick={() => navigate("/login")}>Log In</span></p>
                        </div>
                    </> : <>
                        <div className='text-center flex flex-col justify-between gap-4 h-full'>
                            <div>
                                <h1 className='text-[#100F14] font-semibold text-2xl'>How do you want to be Sign Up?</h1>
                                <p>We need your personal information for applying the rental appliction form</p>
                            </div>
                            <div className='my-[2rem] flex flex-col items-center gap-3'>
                                {
                                    ["Tenant", "Landlord"].map(ele => {
                                        return <button onClick={() => setAccountType(ele)} className={`transition-all flex items-center justify-between gap-2 border ${accountType == ele ? "bg-[#100F14] text-white w-[80%]" : "w-fit  border-[#ECECEC] text-[#47464A]"} rounded-full py-3 px-[1rem] `}>
                                            <div className='!w-[2.5rem] !h-[2.5rem]'></div>
                                            <div>
                                                I'm a <b>{ele}</b>
                                            </div>
                                            {accountType == ele ? <Avatar className={'bg-[#400CFA] border-[#400CFA] !h-[2.5rem] !w-[2.5rem]'} icon={<Svgs.Tick />} /> : <div className='!w-[2.5rem] !h-[2.5rem]'></div>}
                                        </button>
                                    })
                                }
                            </div>
                            <div className='flex items-center justify-center'>
                                <button
                                    onClick={async (e) => {
                                        document.querySelector(".cont_btn").disabled = true;
                                        setUserAccountType({ "id": formStep.id, "data": { "role": accountType.toLocaleLowerCase() } })
                                            .then(resp => {
                                                console.log(resp, "resp");
                                                toast.success("Role Selected Successfully!");
                                                localStorage.setItem("userData", JSON.stringify(resp))
                                                navigate(`/${accountType.toLocaleLowerCase()}-dashboard`);
                                            }).finally(() => {
                                                document.querySelector(".cont_btn").disabled = false;
                                            })
                                    }}

                                    className='disabled:bg-[#400cfa5b] bg-[#400CFA] cont_btn rounded-full px-[3.5rem] py-4 text-white flex items-center justify-center gap-3'
                                >
                                    <p>Continue to Dashboard</p>
                                    <div>
                                        <Svgs.Arrow />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </Onboarding >
    );
};

export default Signup;
