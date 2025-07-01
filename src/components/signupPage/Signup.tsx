'use client'
import { createCookie, storeData } from '@/lib/createCookie';
import { LoginAuth, SignUpAuth } from '@/services/auth/Auth';
import { TextField, Checkbox } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Signup = () => {
    const navigation = useRouter()

    const [firstName, setFirstName] = useState('');
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

                    navigation.push('/');
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
                    navigation.push('/');

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
                                <form
                                    onSubmit={handleSubmit2}
                                    className="flex flex-col items-center gap-6 bg-white dark:bg-boxdark rounded-md w-full md:p-6 p-4 shadow-lg text-white max-w-[500px]"
                                >
                                    {/* Header */}
                                    <div className="text-center space-y-1">
                                        <h2 className="text-3xl font-bold">Sign up</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Welcome! Please enter your details to create an account.
                                        </p>

                                        {error2 === 401 && (
                                            <p className="text-sm text-red-500 bg-red-100 dark:bg-red-800/30 px-4 py-1 rounded-md transition-all duration-300">
                                                Incorrect credentials. Please try again.
                                            </p>
                                        )}
                                    </div>

                                    {/* Input Fields */}
                                    <div className="flex flex-col gap-4 w-full max-w-[400px]">
                                        <TextField
                                            color="secondary"
                                            error={!!error2}
                                            disabled={loading || logsuccess}
                                            name="name"
                                            type="text"
                                            required
                                            id="name"
                                            label="User Name"
                                            onChange={(e) => {
                                                setError(false);
                                                setFirstName(e.target.value);
                                            }}
                                            sx={{
                                                input: { color: 'inherit' },
                                                label: { color: 'inherit' },
                                                '.MuiOutlinedInput-root': {
                                                    backgroundColor: 'transparent',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(156, 163, 175, 0.6)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(59, 130, 246, 1)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'rgba(37, 99, 235, 1)',
                                                    },
                                                },
                                            }}
                                        />

                                        <TextField
                                            color="secondary"
                                            error={!!error2}
                                            disabled={loading || logsuccess}
                                            name="email"
                                            type="email"
                                            required
                                            id="email"
                                            label="Email"
                                            onChange={(e) => {
                                                setError(false);
                                                setEmail(e.target.value);
                                            }}
                                            sx={{
                                                input: { color: 'inherit' },
                                                label: { color: 'inherit' },
                                                '.MuiOutlinedInput-root': {
                                                    backgroundColor: 'transparent',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(156, 163, 175, 0.6)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(59, 130, 246, 1)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'rgba(37, 99, 235, 1)',
                                                    },
                                                },
                                            }}
                                        />

                                        <TextField
                                            color="secondary"
                                            error={!!error2}
                                            disabled={loading || logsuccess}
                                            name="password"
                                            type="password"
                                            required
                                            id="password"
                                            label="Password"
                                            onChange={(e) => {
                                                setError(false);
                                                setPassword(e.target.value);
                                            }}
                                            sx={{
                                                input: { color: 'inherit' },
                                                label: { color: 'inherit' },
                                                '.MuiOutlinedInput-root': {
                                                    backgroundColor: 'transparent',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(156, 163, 175, 0.6)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(59, 130, 246, 1)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'rgba(37, 99, 235, 1)',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>

                                    {/* Remember Me & Forgot */}
                                    <div className="flex justify-between items-center w-full max-w-[400px] text-sm text-gray-300">
                                        <div className="flex items-center gap-1">
                                            <Checkbox
                                                value={rememberMe}
                                                checked={rememberMe}
                                                onChange={() => setRememberMe(!rememberMe)}
                                                sx={{
                                                    color: 'white',
                                                    '&.Mui-checked': {
                                                        color: 'white',
                                                    },
                                                }}
                                            />
                                            <label htmlFor="rememberMe">Remember me</label>
                                        </div>
                                        <button type="button" className="text-blue-500 hover:underline">
                                            Forgot Password?
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        disabled={
                                            (loading || success) ||
                                            firstName.trim() === '' ||
                                            password.trim() === '' ||
                                            email.trim() === ''
                                        }
                                        type="submit"
                                        className="w-full max-w-[400px] py-3 rounded-md bg-blue-700 hover:bg-blue-800 transition disabled:opacity-50"
                                    >
                                        {loading || success ? (
                                            <div className="flex justify-center items-center gap-2">
                                                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                                                Loading...
                                            </div>
                                        ) : (
                                            'Sign up'
                                        )}
                                    </button>

                                    {/* Switch to Login */}
                                    <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                                        Already have an account?{' '}
                                        <span
                                            onClick={() => setNewUser(false)}
                                            className="text-blue-600 dark:text-blue-400 hover:opacity-70 cursor-pointer transition"
                                        >
                                            Login
                                        </span>
                                    </p>
                                </form>

                                :
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col items-center gap-6 bg-white dark:bg-boxdark rounded-md w-full md:p-6 p-4 shadow-lg text-white max-w-[500px]"
                                >
                                    {/* Header */}
                                    <div className="text-center space-y-1">
                                        <h2 className="text-3xl font-bold">Sign in</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Welcome back! Please enter your details.
                                        </p>

                                        {error && (
                                            <p className="text-sm text-red-500 bg-red-100 dark:bg-red-800/30 px-4 py-1 rounded-md transition-all duration-300">
                                                Incorrect credentials. Please try again.
                                            </p>
                                        )}
                                    </div>

                                    {/* Inputs */}
                                    <div className="flex flex-col gap-4 w-full max-w-[400px]">
                                        <TextField
                                            color="secondary"
                                            error={error}
                                            disabled={loading || logsuccess}
                                            name="email"
                                            type="email"
                                            required
                                            id="email"
                                            label="Email"
                                            autoComplete="email"
                                            onChange={(e) => {
                                                setError(false);
                                                setEmail(e.target.value);
                                            }}
                                            sx={{
                                                input: { color: 'inherit' },
                                                label: { color: 'inherit' },
                                                '.MuiOutlinedInput-root': {
                                                    backgroundColor: 'transparent',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(156, 163, 175, 0.6)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(59, 130, 246, 1)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'rgba(37, 99, 235, 1)',
                                                    },
                                                },
                                            }}
                                        />

                                        <TextField
                                            color="secondary"
                                            error={error}
                                            disabled={loading || logsuccess}
                                            name="password"
                                            type="password"
                                            required
                                            id="password"
                                            label="Password"
                                            autoComplete="current-password"
                                            onChange={(e) => {
                                                setError(false);
                                                setPassword(e.target.value);
                                            }}
                                            sx={{
                                                input: { color: 'inherit' },
                                                label: { color: 'inherit' },
                                                '.MuiOutlinedInput-root': {
                                                    backgroundColor: 'transparent',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(156, 163, 175, 0.6)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(59, 130, 246, 1)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'rgba(37, 99, 235, 1)',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>

                                    {/* Options */}
                                    <div className="flex justify-between items-center w-full max-w-[400px] text-sm text-gray-300">
                                        <div className="flex items-center gap-1">
                                            <Checkbox
                                                value={rememberMe}
                                                checked={rememberMe}
                                                onChange={() => setRememberMe(!rememberMe)}
                                                sx={{
                                                    color: 'white',
                                                    '&.Mui-checked': {
                                                        color: 'white',
                                                    },
                                                }}
                                            />
                                            <label htmlFor="rememberMe">Remember me</label>
                                        </div>
                                        <button type="button" className="text-blue-500 hover:underline">
                                            Forgot Password?
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        disabled={(loading || success) || email === '' || password === ''}
                                        type="submit"
                                        className="w-full max-w-[400px] py-3 rounded-md bg-blue-700 hover:bg-blue-800 transition disabled:opacity-50"
                                    >
                                        {loading || success ? (
                                            <div className="flex justify-center items-center gap-2">
                                                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                                                Loading...
                                            </div>
                                        ) : (
                                            'Login'
                                        )}
                                    </button>

                                    {/* Switch to Register */}
                                    <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                                        First time?{' '}
                                        <span
                                            onClick={() => setNewUser(true)}
                                            className="text-blue-600 dark:text-blue-400 hover:opacity-70 cursor-pointer transition"
                                        >
                                            Create an account
                                        </span>
                                    </p>
                                </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup