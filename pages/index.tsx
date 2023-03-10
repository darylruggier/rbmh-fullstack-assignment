import Image from 'next/image';
import Link from "next/link";
import { useState } from 'react';


export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {

  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col w-3/4 h-96 justify-start items-center border-black border rounded-lg">
        <h1 className="text-4xl pt-10 pb-12">Red Bull Case Assignment</h1>
        <input type="email" className="w-3/4 h-12 border-black border rounded-lg mt-4 p-2" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-3/4 h-12 border-black border rounded-lg mt-4 p-2" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-3/4 h-12 border-black border rounded-lg mt-4 p-2" onClick={handleSubmit}>Login</button>
        <p className="text-md pt-6">Not a user? <Link href="/register" className="">Sign up!</Link></p>
      </div>
    </div>
  )
}
