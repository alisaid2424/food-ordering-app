import routes from "@/utils/routes";
import SignInForm from "./SignInForm";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const SignInPage = async () => {
  const t = await getTranslations("auth");

  const loginTranslations = {
    title: t("login.title"),
    emailLabel: t("login.email.label"),
    emailPlaceholder: t("login.email.placeholder"),
    passwordLabel: t("login.password.label"),
    passwordPlaceholder: t("login.password.placeholder"),
    submit: t("login.submit"),
    authPromptMessage: t("login.authPrompt.message"),
    signUpLinkText: t("login.authPrompt.signUpLinkText"),
    loginSuccessful: t("messagesAuth.loginSuccessful"),
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/background-pizza.jpg')] bg-cover bg-center" />

      <section className="w-full min-h-[calc(100vh-114px)] flex items-center justify-center">
        <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-6 w-full mx-2 md:w-2/3 lg:w-2/4 shadow-md">
          <h2 className="text-2xl font-semibold text-center text-black mb-4">
            {loginTranslations.title}
          </h2>
          <SignInForm t={loginTranslations} />
          <p className="mt-2 flex items-center justify-center gap-3 text-gray-500 text-sm">
            <span>{loginTranslations.authPromptMessage}</span>
            <Link href={routes.register} className="text-black font-semibold">
              {loginTranslations.signUpLinkText}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default SignInPage;
