import Link from "next/link";
import { notFound } from "next/navigation";
import EditCategoryForm from "./EditCategoryForm";
import { getCategory } from "@/server/db/categories";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import routes from "@/utils/routes";

type PageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

const EditCategoryPage = async ({ params }: PageProps) => {
  const { categoryId } = await params;
  const category = await getCategory(categoryId);

  if (!category) notFound();

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${routes.categories}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-red-500 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <HiOutlineArrowCircleLeft className="text-xl" /> Back to Categories
            Details
          </Link>

          <EditCategoryForm category={category} />
        </div>
      </section>
    </main>
  );
};

export default EditCategoryPage;
