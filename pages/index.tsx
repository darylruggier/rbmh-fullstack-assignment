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


  const handleLogin = async () => {
    try {
      const login = await signIn('credentials', {
        redirect: false,
        email,
        password,
        // callbackUrl: `${window.location.origin}/profile`
      });

      console.log("login", login)

      if (login?.status === 401) {
        setInvalidCredentials(true);
      } else if (login?.status === 200) {
        setInvalidCredentials(false);
        window.open(`/profile`, '_self');
      }

    } catch (error) {
      alert(error);
    }
    // const res = await fetch('localhost:3000/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
    // const user = await res.json();
    //
    // if (res.ok && user) {
    //   // redirect to /[user.id]/
    //   window.open(`/${user.id}`, '_self');
    // };
    //
    // return null;
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col w-3/4 h-96 justify-start items-center border-black border rounded-lg">
        <h1 className="text-4xl pt-10 pb-12">Red Bull Case Assignment</h1>
        <input type="email" className="w-3/4 h-12 border-black border rounded-lg mt-4 p-2" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-3/4 h-12 border-black border rounded-lg mt-4 p-2" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        { invalidCredentials && <p className="text-sm text-red-400 pt-2">Invalid credentials</p> }
        <button className="w-3/4 h-12 border-black border rounded-lg mt-2" onClick={handleLogin}>Login</button>
        <p className="text-md pt-6 pb-4">Not a user? <Link href="/register" className="">Sign up!</Link></p>
      </div>
    </div>
  )
}
