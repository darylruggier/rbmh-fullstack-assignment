import Image from 'next/image';
import Navbar from './components/Navbar';

export default function PageNotFound() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Navbar />
      <h1 className="text-2xl">Well, this is embarrassing. Where did the page go?! </h1>

    </div>
  );
};
