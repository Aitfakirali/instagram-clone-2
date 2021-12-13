import faker from "faker";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Story from "./Story";

function Stories() {
  const [seggustions, setSeggustions] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const seggustions = [...Array(29)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
      avatar: `/Images/${index}.jpg`,
    }));
    setSeggustions(seggustions);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-900">
      {/* Story */}
      {session && (
        <Story
          username={session?.user?.username}
          image={session?.user?.image}
        />
      )}

      {seggustions.map((profile) => (
        <Story
          key={profile.id}
          username={profile.username}
          image={profile.avatar}
        />
      ))}
    </div>
  );
}

export default Stories;
