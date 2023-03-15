import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LargeButton from '../components/LargeButton';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { token } = context.query;

  return {
    props: {
      token,
    },
  };
}

interface Props {
  token: string;
};

export default function ResetPasswordPage({ token }: Props) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [userHasTypedPassword, setUserHasTypedPassword] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [dynamicPasswordPrompt, setDynamicPasswordPrompt] = useState<string>("New Password");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserHasTypedPassword(true);
    setPassword(e.target.value);
  }

  const handleResetPassword = async () => {
    const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });
  };

  useEffect(() => {
    if (!userHasTypedPassword) return setDynamicPasswordPrompt("New Password");
    if (!password) { // user has typed and the password field is empty
      setDynamicPasswordPrompt("Password is required");
      setIsPasswordInvalid(true);
    } else if (password.length < 5) {
      setDynamicPasswordPrompt("Password must be at least 5 characters");
      setIsPasswordInvalid(true);
    } else {
      setDynamicPasswordPrompt("Create Password");
      setIsPasswordInvalid(false);
    }
  }, [password]);


  return (
    <div>
      <h1>Reset Password</h1>
      <div className="flex flex-col w-full mt-4 relative">
        <label htmlFor="password" className="text-sm font-medium self-start text-[#1A1919]">{dynamicPasswordPrompt}</label>
        <input id="password" value={password} type={showPassword ? "text" : "password"} className="w-full h-12 border-[#a0a1a1] black border rounded-lg mt-2 px-4 py-6" onChange={(e) => handlePasswordChange(e)} />
        <span className="w-6 h-6 absolute inset-y-10 right-0 flex items-center mr-4 hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
          <Link href="/"><Image width="20" height="20" alt={showPassword ? "Hide" : "Show"} src={showPassword ? "/show.png" : "/hide.png"} /></Link>
        </span>
      </div>
      <div className="flex flex-col w-full mt-4 relative">
        <label htmlFor="confirm-password" className="text-sm font-medium self-start text-[#1A1919]">Confirm Password</label>
        <input id="confirm-password" value={confirmPassword} type={showConfirmPass ? "text" : "password"} className="w-full h-12 border-[#a0a1a1] black border rounded-lg mt-2 px-4 py-6" onChange={(e) => setConfirmPassword(e.target.value)} />
        <span className="w-6 h-6 absolute inset-y-10 right-0 flex items-center mr-4 hover:cursor-pointer" onClick={() => setShowConfirmPass(!showConfirmPass)}>
          <Image width="20" height="20" alt={showConfirmPass ? "Hide" : "Show"} src={showConfirmPass ? "/show.png" : "/hide.png"} />
        </span>
      </div>
      <LargeButton label="Reset Password" onClick={handleResetPassword} disabled={isPasswordInvalid} />
      <p>Token: {token}</p>
    </div>
  );
};

