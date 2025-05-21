import { createCookie, storeData } from '@/lib/createCookie';
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { TextField, Checkbox } from '@mui/material';
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
    const [modal2, setModal2] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [logsuccess, setLogsuccess] = useState(false);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault();


        try {
            const formData = new FormData(event.currentTarget); // Create FormData object
            const data: any = Object.fromEntries(formData.entries()); // Convert to object

            console.log(data);

            setLoading(true);

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // 👈 Send raw data, not wrapped in { data }
                });

                if (!response) {
                    throw new Error('Login failed');
                }

                const result = await response.json();
                console.log('Login successful:', result);
                createCookie(result.Token);
                storeData(result.userdata)
                window.location.reload();

                // Handle success (e.g., redirect, store token, etc.)
            } catch (error: any) {
                console.error('Error:', error.message);
                setError(true);
            } finally {
                setLoading(false);
            }

        } catch (err) {
            console.error('Error:', error.message);
            setError(true);
        }

    };

    const handleSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(false);

        const formData = new FormData(event.currentTarget); // Create FormData object
        const data: any = Object.fromEntries(formData.entries()); // Convert to object

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setError(401);
                } else {
                    throw new Error('Signup failed');
                }
            } else {
                const result = await response.json();
                console.log('Signup successful:', result);
                setSuccess(true);
                setLogsuccess(true);
                // Optionally reset form
            }
        } catch (error: any) {
            console.error('Error:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='pt-20'>
            {/* sign in */}
            <div className={`fixed top-0 bottom-0 flex z-[999] transition-all duration-300 left-0 right-0 flex justify-end  ${modal ? "translate-x-0" : " translate-x-full"}`}>
                <div className='absolute z-0 top-0 bottom-0 left-0 right-0 flex justify-end ' onClick={() => setModal(false)}></div>
                <div className='bg-white dark:bg-boxdark z-4 flex items-center shadow-lg shadow-black top-0 bottom-0  absolute overflow-y-auto px-10 py-5 '>
                    <form onSubmit={handleSubmit} className='flex w-full text-white md:p-4  items-center flex-col gap-3 p-4' >
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
                        </div>
                    </form>
                </div>
            </div>
            {/* sig up */}
            <div className={`fixed top-0 bottom-0 flex z-[999] transition-all duration-300 left-0 right-0 flex justify-end  ${modal2 ? "translate-x-0" : " translate-x-full"}`}>
                <div className='absolute z-0 top-0 bottom-0 left-0 right-0 flex justify-end ' onClick={() => setModal2(false)}></div>
                <div className='bg-white dark:bg-boxdark z-4 flex items-center shadow-lg shadow-black top-0 bottom-0  absolute overflow-y-auto px-10 py-5 '>
                    <form onSubmit={handleSubmit2} className='flex w-full text-white md:p-4  items-center flex-col gap-3 p-4' >
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
                            <div className='flex gap-2 '>
                                <TextField color='secondary' error={error2} onChangeCapture={() => setError(false)} disabled={loading || logsuccess} name='fisrtname' onChange={(e) => setFirstName(e.target.value)} type='text' required id="email" autoComplete="" label="First Name" variant="outlined"
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
                                <TextField color='secondary' error={error2} onChangeCapture={() => setError(false)} disabled={loading || logsuccess} name='lastname' onChange={(e) => setLastName(e.target.value)} type='text' required id="email" autoComplete="" label="Last Name" variant="outlined"
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
                                <TextField color='secondary' error={error2} onChangeCapture={() => setError(false)} disabled={loading || logsuccess} name='Email' type='Email' required id="password" autoComplete="" label="Email" variant="outlined"
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
                        </div>
                    </form>
                </div>
            </div>



            <div className=''>
                <div className='text-white grow-0 p-5  flex items-center '>
                    <div className='text-center text-lg w-full'>
                        Welcome to <span className='text-5xl font-bold '>Inxource</span>
                        <div className='text-lg'>inXource provides AI-powered agents that manage sales, marketing, inventory, accounting, and more—all in one place.</div>
                    </div>
                </div>
                <div className='grow flex items-center justify-center'>
                    <div className='text-lg text-white text-center '>
                        <div className='flex items-center gap-4'>
                            <div className='flex gap-4'>
                                <div onClick={() => setModal2(true)} className='bg-gray-300 grow rounded-md py-2 px-10 text-black hover:opacity-[0.4] cursor-pointer duration-500 '>
                                    Sign up
                                </div>
                                <button onClick={() => setModal(true)} className='bg-gray-300 grow rounded-md py-2 px-10 text-black hover:opacity-[0.4] cursor-pointer duration-500 '>
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup