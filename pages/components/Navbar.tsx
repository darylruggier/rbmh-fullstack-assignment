import { NextComponentType } from "next";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const handleLogOut = () => {
    signOut({ callbackUrl: `${window.location.origin}/` });
  }

  return (
    <nav className="absolute top-0 w-full">
      <ul className={`flex p-4 ${session ? 'justify-between' : 'justify-center'}`}>
        <li>
          <Link href={session ? "/profile" : "/"}>
            <Image priority src="/rbmh-logo.png" alt="Red Bull Media House" width={100} height={100} />
          </Link>
        </li>
        { session && (
          <li className="lg:pr-8">
            <button className="bg-rb-red-inactive text-white text-sm font-medium px-8 py-3.5 rounded-md hover:bg-rb-red-active hover:duration-100" onClick={() => handleLogOut()}>Log Out</button>
          </li>
        )}
      </ul>
      </nav>
  );
};

export default Navbar;
