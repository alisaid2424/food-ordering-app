import About from "@/components/About";
import BestSellers from "@/components/BestSellers";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <BestSellers />
      <About />
      <Contact />
    </main>
  );
};

export default HomePage;
