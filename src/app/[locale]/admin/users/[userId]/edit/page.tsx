import EditUserForm from "@/components/forms/EditUserForm";
import { getUser } from "@/server/db/users";
import routes from "@/utils/routes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

interface EditUserPageProps {
  params: Promise<{ userId: string }>;
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
  const { userId } = await params;
  const user = await getUser(userId);

  if (!user) notFound();

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${routes.users}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-red-500 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <HiOutlineArrowCircleLeft className="text-xl" /> Back to Users
          </Link>

          <EditUserForm user={user} />
        </div>
      </section>
    </main>
  );
};

export default EditUserPage;
