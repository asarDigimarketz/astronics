"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {  FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

import "./login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.ok) {
            router.push('/'); // Redirect to home page on success
        } else {
            setError(result?.error || 'Login failed');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8   loginforms">
            <div className="flex justify-center items-center">
                <div className="w-full max-w-md">
                    <form
                        className="form" // Applying custom form styles
                        onSubmit={submitHandler}
                    >
                        <h1 className="mb-4 text-2xl font-bold text-center text-black">Login</h1>
                        {error && (
                            <div className="alert alert-danger mb-4 text-red-600">
                                {error}
                            </div>
                        )}
                        <div className="flex-column">
                            <label className="form-label" htmlFor="email_field">
                                Email address
                            </label>
                            <div className="inputForm">
                                <input
                                    type="email"
                                    name="email"
                                    id="email_field"
                                    className="input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="flex-column relative">
                            <label className="form-label" htmlFor="password_field">
                                Password
                            </label>
                            <div className="inputForm flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle between text and password
                                    name="password"
                                    id="password_field"
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                                <span
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash /> } {/* Toggle icon */}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="button-submit"
                        >
                            Sign in
                        </button>

                        <div className="text-center">
                            <p className='p'>
                                Not a member? <a href="/register" className="span">Register</a>
                            </p>
                        </div>

                        <p className="p text-center">or Sign up with</p>

                        <div className="text-center">
                            <button type="button" onClick={() => signIn('google')} className="btn btn-google">
                                <img src="/google/google.png" alt="Sign in with Google" width={35} height={35} /> Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
