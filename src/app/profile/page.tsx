import EditUserForm from "@/components/forms/EditUserForm";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <h1 className="text-red-500 text-center font-bold text-4xl italic mb-10">
            Profile
          </h1>

          {session?.user && <EditUserForm user={session.user} />}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
