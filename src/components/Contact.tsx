import routes from "@/utils/routes";
import MainHeading from "./MainHeading";

const Contact = () => {
  return (
    <section className="section-gap" id={routes.contact}>
      <div className="container text-center">
        <MainHeading subTitle="Dont Hesitate" title="Contact us" />
        <div className="mt-8">
          <a
            className="text-2xl underline text-gray-600 block mb-5"
            href="tel:+2012121212"
          >
            +2012121212
          </a>
          <a
            className="text-2xl underline text-gray-600"
            href="tel:+2013151315"
          >
            +2013151315
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
