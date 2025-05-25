import Link from "next/link";
import SignUpForm from "./SignUpForm";
import routes from "@/utils/routes";

const SignUpPage = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/background-pizza.jpg')] bg-cover bg-center" />

      <section className="w-full min-h-[calc(100vh-114px)] flex items-center justify-center">
        <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-6 w-full mx-2 md:w-2/3 lg:w-2/4 shadow-md">
          <h2 className="text-2xl font-semibold text-center text-black mb-4">
            Register
          </h2>
          <SignUpForm />
          <p className="mt-2 flex items-center justify-center gap-3 text-gray-500 text-sm">
            <span>Already have an account?</span>
            <Link href={routes.login} className="text-black font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
