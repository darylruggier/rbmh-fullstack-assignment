import Image from 'next/image';
import Link from "next/link";
import Head from 'next/head';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import LargeButton from './components/LargeButton';
import Login from './components/Login';
import Register from './components/Register';

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [emailAlreadyExists, setEmailAlreadyExists] = useState<boolean | null>(null);


  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const areInputsInvalid = email === "" || !emailRegex.test(email);

  const { data: session } = useSession();
  if (session && session.user) {
    return window.open(`/profile`, '_self');
  }

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const checkEmail = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (checkEmail.status === 200) {
        setEmailAlreadyExists(false);
      } else if (checkEmail.status === 409) {
        setEmailAlreadyExists(true);
      }

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Head>
        <title>Red Bull Media House Case Assignment - Login</title>
      </Head>
      <div className="w-1/2 flex flex-col h-128 justify-start items-center text-center rounded-lg sm:shadow-2xl md:w-1/4 pt-10 pb-6 px-4">
        <Image className="cursor-pointer" priority src="/rbmh-logo.png" width={150} height={150} alt="Red Bull Media House" onClick={() => setEmailAlreadyExists(null)} />
        { emailAlreadyExists === null && (
          <div>
            <h1 className="text-2xl font-bold pt-6 leading-9 text-[#1A1919]">Sign in to get the most of Red Bull</h1>
            <p className="text-md text-[#1A1919] mt-3">One account for the World of Red Bull.</p>
          </div>
        )}
        { emailAlreadyExists === true && (
          <div>
            <h2 className="text-md mt-6 font-bold">{email}</h2>
            <p className="text-sm text-[#737477] hover:cursor-pointer hover:text-[#94969b]" onClick={() => setEmailAlreadyExists(null)}>Not your account?</p>
          </div>
        )}
        {(emailAlreadyExists === null) && (
          <div className="flex flex-col w-full m-1 items-center mt-6">
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-sm font-medium self-start text-[#1A1919]">Email</label>
              <input id="email" value={email} type="email" className="w-full h-12 border-[#a0a1a1] black border rounded-lg mt-2 px-4 py-6" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <LargeButton disabled={areInputsInvalid} label="Continue" isLoading={isLoading} onClick={handleContinue} />
            <div className="flex items-center justify-center w-full h-auto my-8 before:h-[1px] before:w-full before:bg-[#a0a1a1] after:w-full after:h-[1px] after:bg-[#a0a1a1]"><span className="h-auto px-4 text-sm text-[#A0A1A1] leading-none whitespace-nowrap">Or continue with</span></div>
            <div className="flex">
              <button className="mx-3 w-[60px] h-[60px] rounded-full border border-[#e2e3e5] hover:bg-[#f8f8f8] transition delay-75"></button>
              <button className="mx-3 w-[60px] h-[60px] rounded-full border border-[#e2e3e5] hover:bg-[#f8f8f8] transition delay-75"></button>
              <button className="mx-3 w-[60px] h-[60px] rounded-full border border-[#e2e3e5] hover:bg-[#f8f8f8] transition delay-75"></button>
            </div>
            {/* <p className="text-md pt-6 pb-5">Not a user? <Link href="/register" className=""><span className="text-rb-red-active">Sign up!</span></Link></p> */}
          </div>
        )}
        {(emailAlreadyExists === true) && <Login email={email} />}
        {(emailAlreadyExists === false) && <Register email={email} />}
        <div className="flex mt-6">
          <Link className="text-sm text-[#A0A1A1] px-4 pt-4 hover:text-[#b5b5b5]" href="https://policies.redbull.com/r/Red_Bull_Account/terms/en">Terms of Use</Link>
          <Link className="text-sm text-[#A0A1A1] px-4 pt-4 hover:text-[#b5b5b5]" href="https://policies.redbull.com/r/Red_Bull_Account/privacy/en">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}
