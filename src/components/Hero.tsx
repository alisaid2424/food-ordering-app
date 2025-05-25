import routes from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="section-gap">
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <div className="md:py-12">
          <h1 className="text-4xl font-semibold">Slice into Happiness</h1>
          <p className="text-gray-500 leading-[1.7] my-4">
            Craving pizza? We&lsquo;ve got you covered with fresh ingredients,
            endless flavors, and the fastest delivery. Your perfect slice is
            just a tap away!
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={routes.menu}
              className="flex gap-2 items-center uppercase py-2 px-4 rounded-full bg-red-500 text-white"
            >
              Order now
              <FiArrowRightCircle fontSize={20} />
            </Link>
            <Link
              href={routes.about}
              className="flex gap-2 items-center text-black hover:text-red-500 duration-200 transition-colors font-semibold"
            >
              Learn more
              <FiArrowRightCircle fontSize={20} />
            </Link>
          </div>
        </div>
        <div className="relative hidden md:block">
          <Image
            src="/pizza.png"
            alt="Pizza"
            fill
            className="object-contain"
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
