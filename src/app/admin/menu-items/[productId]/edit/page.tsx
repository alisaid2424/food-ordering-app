import { getProduct } from "@/server/db/products";
import routes from "@/utils/routes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import EditProductForm from "./EditProductForm";
import { getCategories } from "@/server/db/categories";

interface EditProductPageProps {
  params: Promise<{ productId: string }>;
}

const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { productId } = await params;
  const categories = await getCategories();
  const product = await getProduct(productId);

  if (!product) notFound();

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${routes.menuItems}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-red-500 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <HiOutlineArrowCircleLeft className="text-xl" /> Back to MenuItems
          </Link>

          <EditProductForm product={product} categories={categories} />
        </div>
      </section>
    </main>
  );
};

export default EditProductPage;
