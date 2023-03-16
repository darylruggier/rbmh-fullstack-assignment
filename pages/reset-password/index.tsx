import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LargeButton from '../components/LargeButton';

interface Props {
  token: string;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { token } = context.query;

  return {
    props: {
      token,
    },
  };
}

export default function ResetPasswordPage({ token }: Props) {
  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [userHasTypedPassword, setUserHasTypedPassword] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [dynamicPasswordPrompt, setDynamicPasswordPrompt] = useState<string>("New Password");

  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [tokenNotFound, setTokenNotFound] = useState<boolean>(false);
  const [tokenExpired, setTokenExpired] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserHasTypedPassword(true);
    setPassword(e.target.value);
  }

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
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

      if (response.status === 200) {
        setSuccessMessage(true);
        setTokenExpired(false);
        setErrorMessage(false);
      } else if (response.status === 404) {
        setTokenNotFound(true);
        setSuccessMessage(false);
        setErrorMessage(false);
      } else if (response.status === 400) {
        setTokenExpired(true);
        setErrorMessage(false);
        setTokenNotFound(false);
        setSuccessMessage(false);
      } else {
        setErrorMessage(true);
        setTokenExpired(false);
        setTokenNotFound(false);
        setSuccessMessage(false);
      }
      
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    };
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
    <div className="w-screen h-screen flex items-center justify-center">
      <Head>Red Bull Case Assignment - Reset Password</Head>
      <div className="flex flex-col w-2/3 h-auto justify-start items-center text-center rounded-xl sm:shadow-2xl lg:w-2/5 2xl:w-1/3">
        <Image priority className="py-8 hover:cursor-pointer" src="/rbmh-logo.png" width={150} height={150} alt="Red Bull Media House" onClick={() => router.push("/")}/>
        <div className="flex flex-col w-5/6 pb-6">
          <div className="flex flex-col w-full mt-4 relative">
            <label htmlFor="password" className="text-sm font-medium self-start text-[#1A1919]">{dynamicPasswordPrompt}</label>
            <input id="password" value={password} type={showPassword ? "text" : "password"} className="w-full h-12 border-[#a0a1a1] black border rounded-lg mt-2 px-4 py-6" onChange={(e) => handlePasswordChange(e)} />
            <span className="w-6 h-6 absolute inset-y-10 right-0 flex items-center mr-4 hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              <Image width="20" height="20" alt={showPassword ? "Hide" : "Show"} src={showPassword ? "/show.png" : "/hide.png"} />
            </span>
          </div>
          <div className="flex flex-col w-full mt-4 relative">
            <label htmlFor="confirm-password" className="text-sm font-medium self-start text-[#1A1919]">Confirm Password</label>
            <input id="confirm-password" value={confirmPassword} type={showConfirmPass ? "text" : "password"} className="w-full h-12 border-[#a0a1a1] black border rounded-lg mt-2 px-4 py-6" onChange={(e) => setConfirmPassword(e.target.value)} />
            <span className="w-6 h-6 absolute inset-y-10 right-0 flex items-center mr-4 hover:cursor-pointer" onClick={() => setShowConfirmPass(!showConfirmPass)}>
              <Image width="20" height="20" alt={showConfirmPass ? "Hide" : "Show"} src={showConfirmPass ? "/show.png" : "/hide.png"} />
            </span>
          </div>
          {successMessage && <p className="text-sm font-medium text-green-500 mt-2">Password reset successfully!</p>}
          {tokenExpired && <p className="text-sm font-medium text-red-500 mt-2">Token expired!</p>}
          {tokenNotFound && <p className="text-sm font-medium text-red-500 mt-2">Token not found</p>}
          {errorMessage && <p className="text-sm font-medium text-red-500 mt-2">Something went wrong!</p>}
          <LargeButton label="Reset Password" onClick={handleResetPassword} isLoading={isLoading} disabled={isPasswordInvalid} />
        </div>
      </div>
    </div>
  );
};

