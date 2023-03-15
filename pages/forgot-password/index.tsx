import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

import LargeButton from '../components/LargeButton';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [emailNotFound, setEmailNotFound] = useState<boolean>(false);
  const [emailAlreadySent, setEmailAlreadySent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const areInputsInvalid = email === "" || !emailRegex.test(email);

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setSuccessMessage(true);
      } else if (response.status === 409) {
        setEmailNotFound(false);
        setSuccessMessage(false);
        setErrorMessage(false);
        setEmailAlreadySent(true);
      } else if (response.status === 404) {
        setEmailAlreadySent(false);
        setSuccessMessage(false);
        setErrorMessage(false);
        setEmailNotFound(true);
      } else {
        setEmailAlreadySent(false);
        setEmailNotFound(false);
        setSuccessMessage(false);
        setErrorMessage(true);
      };
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Head>
        <title>Red Bull Media House Case Assignment - Forgot Password</title>
      </Head>
      <div className="flex flex-col w-2/3 h-128 justify-start items-center rounded-xl sm:shadow-2xl lg:w-2/5 2xl:w-1/3">
        <Image priority className="py-8 hover:cursor-pointer" src="/rbmh-logo.png" width={150} height={150} alt="Red Bull Media House" onClick={() => router.push("/")}/>
        <div className="flex flex-col w-5/6 items-center mb-6">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm font-medium self-start text-[#1A1919]">Email</label>
            <input id="email" value={email} type="email" className="w-full h-12 border-[#a0a1a1] black border rounded-lg mt-2 px-4 py-6" onChange={(e) => setEmail(e.target.value)} />
          </div>
          {successMessage && <p className="text-sm font-medium text-green-500 mt-2">Email sent successfully!</p>}
          {errorMessage && <p className="text-sm font-medium text-red-500 mt-2">Something went wrong. Please try again.</p>}
          {emailNotFound && <p className="text-sm font-medium text-red-500 mt-2">Email not found.</p>}
          {emailAlreadySent && <p className="text-sm font-medium text-red-500 mt-2">An email has already sent in the last hour.</p>}
          <LargeButton disabled={areInputsInvalid} label="Send Email" isLoading={isLoading} onClick={handleResetPassword} />
        </div>
      </div>
    </div>
  )
}
