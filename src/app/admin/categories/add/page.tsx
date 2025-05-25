import Link from "next/link";
import AddCategoryForm from "./AddCategoryForm";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import routes from "@/utils/routes";

const AddCategoryPage = () => {
  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${routes.categories}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-red-500 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <HiOutlineArrowCircleLeft className="text-xl" /> Back to Categories
            table
          </Link>

          <AddCategoryForm />
        </div>
      </section>
    </main>
  );
};

export default AddCategoryPage;
