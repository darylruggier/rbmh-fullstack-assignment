import Image from 'next/image';
import Link from "next/link";
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';


export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

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
      <div className="flex flex-col w-3/4 h-96 justify-start items-center shadow-2xl rounded-lg">
        <Image className="py-8" src="/rbmh-logo.png" width={150} height={150} alt="Red Bull Media House" />
        <input value={email} type="email" className="w-3/4 h-12 border-black border rounded-lg mt-4 p-2 px-3" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} type="password" className="w-3/4 h-12 border-black border rounded-lg mt-4 p-2 px-3" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        { invalidCredentials && <p className="text-sm text-red-400 pt-3">Invalid credentials</p> }
        <button className="w-32 h-12 border-black border rounded-full mt-3" onClick={(e) => handleLogin(e)}>Login</button>
        <p className="text-md pt-6 pb-4">Not a user? <Link href="/register" className=""><span className="text-rb-red-active">Sign up!</span></Link></p>
      </div>
    </div>
  )
}
