import { createCookie, storeData } from '@/lib/createCookie';
import { LoginAuth, SignUpAuth } from '@/services/auth/Auth';
import { TextField, Checkbox } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react'

const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(false);
    const [error2, setError2] = useState<any>(false);
    const [success, setSuccess] = useState(false);
    const [modal, setModal] = useState(false);
    const [newUser, setNewUser] = useState(false)
    const [rememberMe, setRememberMe] = useState(false);
    const [logsuccess, setLogsuccess] = useState(false);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault();
        const formData = new FormData(event.currentTarget); // Create FormData object
        const data: any = Object.fromEntries(formData.entries()); // Convert to object
        LoginAuth(data)
            .then((res) => {
                if (res) {
                    createCookie(res.Token);
                    storeData(res.userdata)
                    setSuccess(true)
                    window.location.reload();
                }
            })
            .catch((err) => {
                setError('something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const handleSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(false);

        const formData = new FormData(event.currentTarget); // Create FormData object
        const data: any = Object.fromEntries(formData.entries()); // Convert to object
        console.log(JSON.stringify(data))

        SignUpAuth(data)
            .then((res) => {
                if (res) {
                    createCookie(res.Token);
                    storeData(res.userdata)
                    setSuccess(true)
                    window.location.reload();
                }
            })
            .catch((error) => {
                setError2('something went Wrong')
            })
            .finally(() => {
                setLoading(false)
            })

    };

    return (
        <div className='pt-20'>
            {/* sign in */}
            <div className={`fixed top-0 bottom-0 flex z-[999] transition-all duration-300 left-0 right-0 flex justify-end  ${modal ? "translate-x-0" : " translate-x-full"}`}>
                <div className='absolute z-0 top-0 bottom-0 left-0 right-0 flex justify-end ' onClick={() => setModal(false)}></div>
                <div className='bg-white dark:bg-boxdark z-4 flex items-center shadow-lg shadow-black top-0 bottom-0  absolute overflow-y-auto px-10 py-5 '>

                </div>
            </div>
            {/* sig up */}



            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='dark:text-white grow-0 p-5  flex items-center '>
                    <div className='text-center text-lg w-full'>
                        <span className='text-5xl font-bold '>Inxource</span>
                        <div className='text-lg'>inXource provides AI-powered agents that manage sales, marketing, inventory, accounting, and more—all in one place.</div>
                    </div>
                </div>

                <div>
                    <div className=' z-4 flex items-center shadow-black  px-10 py-5 '>
                        {
                            newUser ?
                                <form onSubmit={handleSubmit2} className='flex bg-white dark:bg-boxdark rounded-md w-full text-white md:p-4 shadow-lg items-center flex-col gap-3 p-4' >
                                    <div className='flex flex-col items-center gap-3'>
                                        <div className='flex font-bold flex-col gap-2 items-center'>
                                            {/* <label className='text-2xl'>Zitfuse</label> */}
                                            <label className=" font-bold text-3xl">Sign up</label>
                                            <label className=" font-md text-sm">Welcome back! Please enter your details</label>
                                            {
                                                error2 == 401 ?
                                                    <label className="text-red-500 bg-red-100 py-1 px-4 duration-500 transition-all font-md  text-sm">
                                                        Incorect Credentials
                                                    </label>
                                                    :
                                                    ''
                                            }
                                        </div>
                                    </div>
                                    <div className="rounded-lg max-w-[400px] grow w-full grow flex flex-col gap-4 ">
                                        <div className='flex gap-2 flex-col'>
                                            <TextField color='secondary' error={error2} onChangeCapture={() => setError(false)} disabled={loading || logsuccess} name='name' onChange={(e) => setFirstName(e.target.value)} type='text' required id="email" autoComplete="" label="User Name" variant="outlined"
                                                sx={{
                                                    input: { color: 'white' }, // Input text
                                                    label: { color: 'white' }, // Label text
                                                    '.MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: 'white' }, // Default border
                                                        '&:hover fieldset': { borderColor: 'white' }, // Hover border
                                                        '&.Mui-focused fieldset': { borderColor: 'white' } // Focused border
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className='flex gap-2 flex-col'>
                                            <TextField color='secondary' error={error2} onChangeCapture={() => setError(false)} disabled={loading || logsuccess} name='email' type='Email' required id="password" autoComplete="" label="Email" variant="outlined"
                                                sx={{
                                                    input: { color: 'white' }, // Input text
                                                    label: { color: 'white' }, // Label text
                                                    '.MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: 'white' }, // Default border
                                                        '&:hover fieldset': { borderColor: 'white' }, // Hover border
                                                        '&.Mui-focused fieldset': { borderColor: 'white' } // Focused border
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className='flex gap-2 flex-col'>
                                            <TextField color='secondary' error={error2} onChangeCapture={() => setError(false)} disabled={loading || logsuccess} name='password' type='password' required id="password" autoComplete="" label="Password" variant="outlined"
                                                sx={{
                                                    input: { color: 'white' }, // Input text
                                                    label: { color: 'white' }, // Label text
                                                    '.MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: 'white' }, // Default border
                                                        '&:hover fieldset': { borderColor: 'white' }, // Hover border
                                                        '&.Mui-focused fieldset': { borderColor: 'white' } // Focused border
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center'>
                                                <Checkbox
                                                    value={rememberMe}
                                                    checked={rememberMe}
                                                    onChange={() => setRememberMe(!rememberMe)}
                                                    sx={{
                                                        color: 'white', // Unchecked color
                                                        '&.Mui-checked': {
                                                            color: 'white', // Checked color
                                                        },
                                                    }}
                                                />
                                                <label className='text-sm' htmlFor='rememberMe'>Remember me</label>
                                            </div>
                                            <div>
                                                <label className='text-blue-700'>Forgot Password?</label>
                                            </div>
                                        </div>
                                        <button disabled={(loading || success) && (firstName == '' || password == '' || lastName == '' || email == '')} type='submit' className='py-3 rounded-md outline-none text-white border-none bg-blue-700 w-[100%]'>
                                            {loading || success ? <div className='flex items-end justify-center'>Loading... </div> : 'Sign up'}
                                        </button>
                                        <label className='text-sm text-center'>First time? <span className='hover:opacity-[0.5] cursor-pointer duration-500' onClick={()=>setNewUser(false)}>sign up</span></label>

                                    </div>
                                </form>
                                :
                                <form onSubmit={handleSubmit} className='flex bg-white dark:bg-boxdark rounded-md w-full text-white md:p-4 shadow-lg items-center flex-col gap-3 p-4' >
                                    <div className='flex flex-col items-center gap-3'>
                                        <div className='flex font-bold flex-col gap-2 items-center'>
                                            {/* <label className='text-2xl'>Zitfuse</label> */}
                                            <label className=" font-bold text-3xl">Sign in</label>
                                            <label className=" font-md text-sm">Welcome back! Please enter your details</label>
                                            {
                                                error ?
                                                    <label className="text-red-500 bg-red-100 py-1 px-4 duration-500 transition-all font-md  text-sm">
                                                        Incorect Credentials
                                                    </label>
                                                    :
                                                    ''
                                            }
                                        </div>
                                    </div>
                                    <div className="rounded-lg max-w-[400px] grow w-full grow flex flex-col gap-4 ">
                                        <div className='flex gap-2 flex-col'>
                                            <TextField color='secondary' error={error} onChangeCapture={() => setError(false)} disabled={loading || logsuccess} name='email' onChange={(e) => setEmail(e.target.value)} type='email' required id="email" autoComplete="" label="Email" variant="outlined"
                                                sx={{
                                                    input: { color: 'white' }, // Input text
                                                    label: { color: 'white' }, // Label text
                                                    '.MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: 'white' }, // Default border
                                                        '&:hover fieldset': { borderColor: 'white' }, // Hover border
                                                        '&.Mui-focused fieldset': { borderColor: 'white' } // Focused border
                                                    }
                                                }}
                                            />

                                        </div>
                                        <div className='flex gap-2 flex-col'>
                                            <TextField color='secondary' error={error} onChangeCapture={() => setError(false)} disabled={loading || logsuccess} name='password' type='password' required id="password" autoComplete="" label="Password" variant="outlined"
                                                sx={{
                                                    input: { color: 'white' }, // Input text
                                                    label: { color: 'white' }, // Label text
                                                    '.MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: 'white' }, // Default border
                                                        '&:hover fieldset': { borderColor: 'white' }, // Hover border
                                                        '&.Mui-focused fieldset': { borderColor: 'white' } // Focused border
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center'>
                                                <Checkbox
                                                    value={rememberMe}
                                                    checked={rememberMe}
                                                    onChange={() => setRememberMe(!rememberMe)}
                                                    sx={{
                                                        color: 'white', // Unchecked color
                                                        '&.Mui-checked': {
                                                            color: 'white', // Checked color
                                                        },
                                                    }}
                                                />

                                                <label className='text-sm' htmlFor='rememberMe'>Remember me</label>
                                            </div>
                                            <div>
                                                <label className='text-blue-700'>Forgot Password?</label>
                                            </div>
                                        </div>
                                        <button disabled={(loading || success) && (email == '' || password == '')} type='submit' className='py-3 rounded-md outline-none text-white border-none bg-blue-700 w-[100%]'>
                                            {loading || success ? <div className='flex items-end justify-center'>Loading... </div> : 'Login'}
                                        </button>
                                        
                                        <label className='text-sm text-center'>First time? <span className='hover:opacity-[0.5] cursor-pointer duration-500' onClick={()=>setNewUser(true)}>login</span></label>
                                    </div>
                                </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup