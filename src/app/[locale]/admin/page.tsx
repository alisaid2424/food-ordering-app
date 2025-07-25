import EditUserForm from "@/components/forms/EditUserForm";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("profile");

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <h1 className="text-red-500 text-center font-bold text-4xl italic mb-10">
            {t("title")}
          </h1>

          {session?.user && <EditUserForm user={session.user} />}
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
