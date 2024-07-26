import { useSession } from "next-auth/react";

const Profile: React.FC = () => {
  const session = useSession();
  return (
    <div className="col-span-8 rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
      <h1>Profile</h1>
      {session && (
        <div>

          <p>{session.data?.user?.name}</p>
          <p>{session.data?.user?.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;