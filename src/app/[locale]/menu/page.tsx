import MenuSection from "@/components/MenuSection";
import { getProductsByCategory } from "@/server/db/products";
import LottieHandler from "@/utils/LottieHandler";

const MenuPage = async () => {
  const categorites = await getProductsByCategory();
  return (
    <main>
      {categorites.length > 0 ? (
        categorites.map((category) => (
          <section key={category.id} className="section-gap">
            <div className="container text-center">
              <h1 className="text-red-500 font-bold text-4xl italic mb-4">
                {category.name}
              </h1>
              <p className="text-gray-400 text-sm capitalize mb-10">
                {category.description}
              </p>
              <MenuSection items={category.products} />
            </div>
          </section>
        ))
      ) : (
        <div className="flex justify-center items-center text-center min-h-[calc(100vh-114px)]">
          <LottieHandler type="empty" message="No categories found" />
        </div>
      )}
    </main>
  );
};

export default MenuPage;
