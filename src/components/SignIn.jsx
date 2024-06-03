import React from "react";
import Image from 'next/image'
import { authContext } from "@/lib/store/authContext";
import { FcGoogle } from "react-icons/fc"
import { useContext } from "react";

function SignIn() {

    const { googleLoginHandler } = useContext(authContext);
    return (
        <main className="container max-w-2xl px-6 mx-auto">
            <h1 className="mb-6 text-6xl font-bold text-center">
                Welcome! 👋🏼
            </h1>

            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
                <div className="h-52">
                    {/* <Image
                        className="object-cover w-full h-full"
                        src="https://cdn4.vectorstock.com/i/1000x1000/08/43/expense-tracker-app-rgb-color-icon-vector-39050843.jpg"
                        alt="Expense Tracker"
                        width={300}
                        height={100}
                    /> */}
                </div>
                <div className="px-4 py-4">
                    <h3 className="text-2xl text-center mb-2">Please Sign in to Continue</h3>
                    <button onClick={googleLoginHandler} className="btn btn-primary flex items-center justify-center gap-2 mx-auto">
                        <FcGoogle />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </div>
        </main>
    )
}

export default SignIn;