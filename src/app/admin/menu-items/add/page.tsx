import routes from "@/utils/routes";
import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import AddProductForm from "./AddProductForm";
import { getCategories } from "@/server/db/categories";
import { redirect } from "next/navigation";

const AddProductPage = async () => {
  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    redirect(`${routes.categories}/add`);
  }

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${routes.menuItems}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-red-500 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <HiOutlineArrowCircleLeft className="text-xl" />
            Back to Products
          </Link>

          <AddProductForm categories={categories} />
        </div>
      </section>
    </main>
  );
};

export default AddProductPage;
