import Image from 'next/image';
import Link from "next/link";
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';


export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const areInputsInvalid = email === "" || password === "" || !emailRegex.test(email);

  const { data: session } = useSession();
  if (session && session.user) {
    return window.open(`/profile`, '_self');
  }


  const handleLogin = async (e: React.ChangeEvent<any>) => {
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
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col w-1/2 h-128 justify-start items-center sm:shadow-2xl rounded-lg">
        <Image className="py-8" src="/rbmh-logo.png" width={150} height={150} alt="Red Bull Media House" />
        <div className="flex flex-col w-5/6 items-center">
          <label className="text-sm font-medium self-start text-[#1A1919]">Email</label>
          <input value={email} type="email" className="w-full h-12 border-[#a0a1a1] black border rounded-lg mt-2 px-4 py-6" onChange={(e) => setEmail(e.target.value)} />
          <label className="text-sm font-medium self-start mt-4 text-[#1A1919]">Password</label>
          <input value={password} type="password" className="w-full h-12 border-[#a0a1a1] border rounded-lg mt-2 px-4 py-6" onChange={(e) => setPassword(e.target.value)} />
          { invalidCredentials && <p className="text-sm text-red-400 pt-3">Invalid credentials</p> }
          <button disabled={areInputsInvalid} className="w-full h-12 rounded-lg mt-3 bg-rb-red-active text-white disabled:bg-[#E2E3E5]" onClick={(e) => handleLogin(e)}>Login</button>
          <p className="text-md pt-6 pb-4">Not a user? <Link href="/register" className=""><span className="text-rb-red-active">Sign up!</span></Link></p>
        </div>
      </div>
    </div>
  )
}
