import Image from 'next/image';
import Link from "next/link";
import Head from 'next/head';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

import LargeButton from './components/LargeButton';


export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowConfirmPass] = useState<boolean>(false);
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const areInputsInvalid = email === "" || password === "" || !emailRegex.test(email);


  const { data: session } = useSession();
  if (session && session.user) {
    return window.open(`/profile`, '_self');
  }


  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const login = await signIn('credentials', {
        redirect: false,
        email,
        password,
        // callbackUrl: `${window.location.origin}/profile`
      });

      if (login?.status === 401) {
        setInvalidCredentials(true);
      } else if (login?.status === 200) {
        setInvalidCredentials(false);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Head>
        <title>Red Bull Media House Case Assignment - Login</title>
      </Head>
      <div className="flex flex-col w-5/6 h-128 justify-start items-center rounded-xl sm:shadow-2xl lg:w-1/2">
        <Image priority className="py-8" src="/rbmh-logo.png" width={150} height={150} alt="Red Bull Media House" />
        <div className="flex flex-col w-5/6 items-center">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm font-medium self-start text-[#1A1919]">Email</label>
            <input id="email" value={email} type="email" className="w-full h-12 border-[#a0a1a1] black border rounded-lg mt-2 px-4 py-6" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col w-full relative">
            <label htmlFor="password" className="text-sm font-medium self-start mt-4 text-[#1A1919]">Password</label>
            <input id="password" value={password} type={showPassword ? "text" : "password"} className="w-full h-12 border-[#a0a1a1] black border rounded-lg mt-2 px-4 py-6" onChange={(e) => setPassword(e.target.value)} />
            <span className="w-6 h-6 absolute inset-y-14 right-0 flex items-center mr-4 hover:cursor-pointer" onClick={() => setShowConfirmPass(!showPassword)}>
              <Image width="20" height="20" alt={showPassword ? "Hide" : "Show"} src={showPassword ? "/show.png" : "/hide.png"} />
            </span>
            <span className="text-sm mt-2 font-medium self-start text-[#737477] hover:cursor-pointer"><Link href="/forgot-password">Forgot Password?</Link></span>
          </div>
          { invalidCredentials && <p className="text-sm text-red-400 pt-3">Invalid credentials</p> }
          <LargeButton disabled={areInputsInvalid} label="Login" isLoading={isLoading} onClick={handleLogin} />
          <p className="text-md pt-6 pb-5">Not a user? <Link href="/register" className=""><span className="text-rb-red-active">Sign up!</span></Link></p>
        </div>
      </div>
    </div>
  )
}
