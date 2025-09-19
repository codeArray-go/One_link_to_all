"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import axios from 'axios';
import { Eye, EyeOff } from "lucide-react";

const page = () => {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [time, setTime] = useState(0);
    const [submited, setSubmited] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 5 minute countdown for otp
    useEffect(() => {
        if (!isVerifying || time <= 0) return;

        const interval = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isVerifying, time]);

    // Formating time in mm:ss format
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // Request OTP.
    const handleEmailVerification = async () => {
        try {
            if (email) {
                setIsSubmiting(true);
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify/send-otp`, { email });
                setIsVerifying(true);
                return alert("OTP sended succesfully to filled E-mail.")
            } else {
                alert("Fill E-mail first then request for OTP. 😏");
            }
        } catch (err) {
            alert("Failed to send otp");
        } finally {
            setTime(300);
            setIsSubmiting(false);
        }
    }

    // Verify OTP
    const handleOtpVerification = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify/verify-otp`, { email, otp });
            alert(res.data.message);
            setOtp("");
            setTime(0);
            setIsDisabled(false);
            setSubmited(true);
        } catch (err) {
            alert(err.response?.data?.message || "Verification failed");
        } finally {
            setIsVerifying(false);
        }
    }

    // Login and signIn process from here
    const [isLogin, setIsLogin] = useState(true);
    const toggleLogin = () => {
        setIsLogin((prev) => !prev);
    }

    // Handle Signup of user
    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Crating payload
        const payload = {};
        for (let [key, value] of formData.entries()) {
            payload[key] = value.trim();
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Account created successfylly");
                setIsLogin(true);
            } else {
                alert(data.message || "SignUp Failed");
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }

    }

    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/generate');
        }
    }, [isAuthenticated, router]);

    // Handle Login of User
    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const payload = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            const data = await res.json();
            if (res.ok) {
                useAuthStore.getState().login(data.user.username);
            } else {
                alert(data.message || "Login Failed");
            }
        } catch (err) {
            console.error("Login krne me error aa rha hai bhai: ", err);
        }
    }

    return (
        <div className="text-gray-700 mx-auto px-4 sm:px-6 lg:px-8">
            {isLogin ? (
                <>
                    <h1 className="font-bold text-center text-2xl sm:text-3xl md:text-4xl py-8 NunitoEB">
                        Login to generate your own Link Tree.
                    </h1>

                    <form className="w-full max-w-md mx-auto" onSubmit={handleLogin}>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Your email
                            </label>
                            <input
                                name="email"
                                type="text"
                                id="email"
                                className="w-full p-2.5 rounded-lg text-sm dark:bg-gray-300 text-black dark:placeholder-gray-500"
                                placeholder="email123@gmail.com"
                                required
                            />
                        </div>
                        <div className="mb-6 relative">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-900"
                            >
                                Password
                            </label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="text-sm rounded-lg w-full p-2.5 dark:bg-gray-300 dark:placeholder-gray-500 text-black pr-10"
                                placeholder="•••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Submit
                        </button>

                        <p
                            onClick={toggleLogin}
                            className="mt-4 text-sm text-center cursor-pointer text-blue-800 hover:text-blue-600"
                        >
                            Don&apos;t have account? Create a New.
                        </p>
                    </form>
                </>
            ) : (
                <>
                    <h1 className="font-bold text-center text-2xl sm:text-3xl md:text-4xl pb-8 NunitoEB">
                        Create A Fresh Account Here.
                    </h1>

                    <form className="w-full max-w-2xl mx-auto" onSubmit={handleSignup}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                    Username
                                </label>
                                <input
                                    name="username"
                                    type="text"
                                    id="username"
                                    className="w-full p-2.5 rounded-lg text-sm dark:bg-gray-300 dark:placeholder-gray-500 text-black"
                                    placeholder="your username"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">
                                    Current age
                                </label>
                                <input
                                    name="age"
                                    type="number"
                                    id="age"
                                    className="w-full p-2.5 rounded-lg text-sm dark:bg-gray-300 dark:placeholder-gray-500 text-black"
                                    placeholder="your age in numbers."
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Verification */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                                <input
                                    value={email}
                                    readOnly={submited || isVerifying}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    type="email"
                                    id="email"
                                    className="flex-1 p-2.5 rounded-lg text-sm dark:bg-gray-300 dark:placeholder-gray-500 text-black disabled:opacity-60"
                                    placeholder="your email address"
                                    required
                                />

                                {submited ? (
                                    <span className="text-green-500">Verified ✅</span>
                                ) : (
                                    <button
                                        disabled={isVerifying}
                                        onClick={handleEmailVerification}
                                        type="button"
                                        className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br rounded-lg disabled:opacity-60"
                                    >
                                        {isSubmiting ? "Sending OTP..." : "Verify email"}
                                    </button>
                                )}
                            </div>

                            {isVerifying && (
                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                                    <input
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        name="otp"
                                        type="text"
                                        id="otp"
                                        className="flex-1 p-2.5 rounded-lg text-sm dark:bg-gray-300 dark:placeholder-gray-500 text-black"
                                        placeholder="123456"
                                        required
                                    />
                                    <button
                                        onClick={handleOtpVerification}
                                        type="button"
                                        className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br rounded-lg"
                                    >
                                        Submit OTP
                                    </button>
                                </div>
                            )}

                            {isVerifying && (
                                <div className="mt-3 text-center">
                                    <p className="text-sm text-gray-700">
                                        Time left:{" "}
                                        <span className={time <= 30 ? "text-red-500" : "text-green-600"}>
                                            {formatTime(time)}
                                        </span>{" "}
                                        <span
                                            disabled={time > 0}
                                            onClick={handleEmailVerification}
                                            className="cursor-pointer text-blue-700 hover:underline disabled:opacity-60"
                                        >
                                            Resend OTP
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Passwords */}
                        <div className="mb-6 relative">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-900"
                            >
                                Password
                            </label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="text-sm rounded-lg w-full p-2.5 dark:bg-gray-300 dark:placeholder-gray-500 text-black pr-10"
                                placeholder="•••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6 relative">
                            <label
                                htmlFor="confirm_password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-900"
                            >
                                Confirm Password
                            </label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm_password"
                                className="text-sm rounded-lg w-full p-2.5 dark:bg-gray-300 dark:placeholder-gray-500 text-black pr-10"
                                placeholder="•••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isDisabled}
                            className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Submit
                        </button>
                    </form>

                    <p className="text-center pt-6 text-sm text-gray-700">
                        Already have an account?{" "}
                        <span onClick={toggleLogin} className="text-blue-700 underline cursor-pointer">
                            Login
                        </span>
                    </p>
                </>
            )}
        </div>
    );

}

export default page
