import Image from 'next/image';
import Navbar from './components/Navbar';
import Head from 'next/head';

export default function PageNotFound() {
  return (
    <div className="h-screen w-screen flex justify-center items-center text-center">
      <Head>
        <title>Red Bull Media House Case Assignment - 404</title>
      </Head>
      <Navbar />
      <h1 className="text-xl md:text-2xl">Well, this is embarrassing. Where did the page go?! </h1>
    </div>
  );
};
