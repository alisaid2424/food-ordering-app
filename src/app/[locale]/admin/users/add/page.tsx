import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import AddUserForm from "./AddUserForm";
import routes from "@/utils/routes";

const AddUserPage = () => {
  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${routes.users}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-red-500 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <HiOutlineArrowCircleLeft className="text-xl" /> Back to Users table
          </Link>

          <AddUserForm />
        </div>
      </section>
    </main>
  );
};

export default AddUserPage;
