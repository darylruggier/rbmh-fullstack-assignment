import { useSession } from "next-auth/react";

import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function Profile() {
  const { data: session } = useSession();

  if (session) {
    console.log("session", session)
  }
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col w-2/3 h-2/3 mt-32 justify-start items-center rounded-lg shadow-2xl">
        <h1 className="text-5xl font-semibold text-black sm:text-[3rem] mt-4">{ session?.user?.name ? `Hey, ${session.user.first_name}!` : "Profile"}</h1>
        {session? (
          <div className="text-center">
            <p className="text-lg">Welcome {session.user?.first_name}</p>
            <p className="text-lg">Your email is {session.user?.email}</p>
          </div>
        ) : (
          <p className="text-2xl font-bold">You are not logged in!<br/><a href="/"><Button label="Log In" /></a></p>
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
