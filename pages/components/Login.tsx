import Link from "next/link";
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import LargeButton from './LargeButton';

interface Props {
  email: string
};

const Login: React.FC<Props> = ({ email }) => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowConfirmPass] = useState<boolean>(false);

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const areInputsInvalid = password === ""; 

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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
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
    </div>
  );
};

export default Login;
