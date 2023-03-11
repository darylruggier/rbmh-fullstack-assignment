import { useSession } from "next-auth/react";
import NextAuth from '../api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next";
import { useEffect } from "react";

export default function Profile() {
  const { data: session } = useSession();

  console.log("session", session);


  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col w-3/4 h-96 justify-start items-center border-black border rounded-lg">
        <h1 className="text-4xl pt-10 pb-12">Red Bull Case Assignment</h1>
        {session? (
          <div>
            <p className="text-lg">Welcome {session.user?.name}</p>
            <p className="text-lg">Your email is {session.user?.email}</p>
          </div>
        ) : (
          <p className="text-lg">You are not logged in</p>
        )}
      </div>
    </div>
  )
};

// export async function getServerSideProps(ctx: any) {
//   const session = await getSession(ctx)
//   if (!session) {
//     return {
//       props: {}
//     }
//   }
//   const { user } = session;
//   return {
//     props: { user },
//   }
// }
