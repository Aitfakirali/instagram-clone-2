import { signOut, useSession } from "next-auth/react";

function Profile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center mt-14 justify-between ml-10">
      <img
        className="rounded-full border p-[2px] w-16 h-16"
        src={session?.user?.image}
        alt="profile pic"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-semibold hover:underline cursor-pointer">
          {session?.user?.username}
        </h2>
        <p className="text-sm text-gray-400">Welcome to instagram clone</p>
      </div>
      <button onClick={signOut} className="text-blue-400 text-sm font-semibold">
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
