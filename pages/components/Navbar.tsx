import { NextComponentType } from "next";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

import SmallButton from "./SmallButton";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const handleLogOut = () => {
    signOut({ callbackUrl: `${window.location.origin}/` });
  }

  return (
    <nav className="top-0 w-full sm:w-5/6 self-center">
      <ul className={`flex p-4 ${session ? 'justify-between' : 'justify-center'}`}>
        <li>
          <Link href={session ? "/profile" : "/"}>
            <Image priority src="/rbmh-logo.png" alt="Red Bull Media House" width={100} height={100} />
          </Link>
        </li>
        { session && (
          <li className="lg:pr-8">
            <SmallButton label="Log Out" onClick={handleLogOut} />
          </li>
        )}
      </ul>
      </nav>
  );
};

export default Navbar;
