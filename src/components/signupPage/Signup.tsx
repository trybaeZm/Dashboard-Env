'use client'
import { createCookie, storeData } from '@/lib/createCookie';
import { LoginAuth, SignUpAuth } from '@/services/auth/Auth';
import { TextField, Checkbox } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useTheme } from "@mui/material/styles";
import Image from 'next/image';
import { InxourceLogo } from '../svgs/inxourceLogo';


const Signup = () => {
    const theme = useTheme();
    const navigation = useRouter()

    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

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
                    console.log(res)
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
        <>
            <div className={`fixed top-0 bottom-0 flex z-[999]  transition-all duration-300 left-0 right-0 flex justify-end  ${modal ? "translate-x-0" : " translate-x-full"}`}>
                <div className='absolute z-0 top-0 bottom-0 left-0 right-0 flex justify-end ' onClick={() => setModal(false)}></div>
                <div className='bg-white dark:bg-boxdark z-4 flex items-center shadow-lg shadow-black top-0 bottom-0  absolute overflow-y-auto px-10 py-5 '>
                </div>
            </div>
            {/* sig up */}
            <div className='grid grid-cols-1 min-h-screen flex items-center justify-center  md:grid-cols-2'>
                <div className='dark:text-white hidden bg-gray-700 h-full grow-0 p-5  md:flex items-center '>
                    <div className='text-center flex flex-col items-center gap-4 text-lg w-full'>
                        <Image width={400} height={400} src='/images/inxource2.svg' alt='images' />
                        <InxourceLogo />
                        <div className='text-lg max-w-[500px]'>inXource provides AI-powered agents that manage sales, marketing, inventory, accounting, and more—all in one place.</div>
                    </div>
                </div>

                <div className='text-center flex flex-col items-center'>
                    <div className='max-w-[500px] w-full z-4 flex items-center px-10 py-5 '>
                        {
                            newUser ?
                                <form
                                    onSubmit={handleSubmit2}
                                    className="flex flex-col items-center gap-6 w-full md:p-6 p-4 text-white max-w-[500px]"
                                >
                                    {/* Header */}
                                    <div className="text-center flex flex-col items-center space-y-4">
                                        <InxourceLogo />
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
                                    <div className="flex flex-col items-start gap-2 w-full max-w-[400px]">
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            User Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            disabled={loading || logsuccess}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full p-2 mt-1 rounded-md bg-transparent border border-gray-400 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1"
                                        />

                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            disabled={loading || logsuccess}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full p-2 mt-1 rounded-md bg-transparent border border-gray-400 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1"
                                        />

                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            disabled={loading || logsuccess}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full p-2 mt-1 rounded-md bg-transparent border border-gray-400 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1"
                                        />
                                    </div>

                                    {/* Terms & Conditions Checkbox */}
                                    <div className="flex items-center gap-2 w-full max-w-[400px]">
                                        <input
                                            type="checkbox"
                                            required
                                            id="terms"
                                            checked={agreed}
                                            onChange={() => setAgreed(!agreed)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                                            I agree to the{' '}
                                            <a href="/terms" className="text-blue-600 underline">
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        disabled={
                                            loading || success || firstName.trim() === '' || password.trim() === '' || email.trim() === '' || !agreed
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
                                    className="flex flex-col items-center gap-3 md w-full md:p-6 p-4 text-white "
                                >
                                    {/* Header */}
                                    <div className="text-center items-center flex flex-col justify-center space-y-4">
                                        <InxourceLogo />
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
                                    <div className="flex items-start gap-2 flex-col w-full max-w-[400px]">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Username or email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            disabled={loading || logsuccess}
                                            onChange={(e) => {
                                                setError(false);
                                                setEmail(e.target.value);
                                            }}
                                            className={`
    w-full p-2 mt-1 rounded-md
    bg-transparent
    border
    ${error ? "border-red-500 focus:border-red-600 focus:ring-red-600" : "border-gray-400 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600"}
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:ring-1
  `}
                                        />
                                        {error && (
                                            <p className="mt-1 text-sm text-red-500">Invalid email address</p>
                                        )}


                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            autoComplete="current-password"
                                            disabled={loading || logsuccess}
                                            onChange={(e) => {
                                                setError(false);
                                                setPassword(e.target.value);
                                            }}
                                            className={`
    w-full p-2 mt-1 rounded-md
    bg-transparent
    border
    ${error ? "border-red-500 focus:border-red-600 focus:ring-red-600" : "border-gray-400 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600"}
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:ring-1
  `}
                                        />
                                        {error && (
                                            <p className="mt-1 text-sm text-red-500">Invalid password</p>
                                        )}

                                    </div>

                                    {/* Options */}

                                    <div className="flex justify-end items-center w-full max-w-[400px] text-sm text-gray-300">
                                        <div className="flex hidden items-center gap-1">
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
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                required
                                                id="terms"
                                                checked={agreed}
                                                onChange={() => setAgreed(!agreed)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                                                I agree to the <a href="/terms" className="text-blue-600 underline">Terms and Conditions</a>
                                            </label>
                                        </div>
                                    </div>

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
        </>
    )
}

export default Signup