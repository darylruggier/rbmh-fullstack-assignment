import { NextComponentType } from "next";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const handleLogOut = () => {
    signOut({ callbackUrl: `${window.location.origin}/` });
  }

  return (
    <nav className="absolute top-0 w-full">
      <ul className="flex justify-between p-4">
        <li>
          <Link href="/">
            <img src="../../assets/rbmh-logo.png" alt="Red Bull Media House" />
          </Link>
        </li>
        { session && (
          <li className="pr-8">
            <button className="bg-rb-red-inactive text-white text-sm font-medium px-8 py-3.5 rounded-md hover:bg-rb-red-active hover:duration-100 sm:px-6" onClick={() => handleLogOut()}>Log Out</button>
          </li>
        )}
      </ul>
      </nav>
  );
};

export default Navbar;
