import { Link } from "@/i18n/navigation";
import SignUpForm from "./SignUpForm";
import routes from "@/utils/routes";
import { getTranslations } from "next-intl/server";

const SignUpPage = async () => {
  const t = await getTranslations("auth.register");

  const registerTranslations = {
    title: t("title"),
    nameLabel: t("name.label"),
    namePlaceholder: t("name.placeholder"),
    emailLabel: t("email.label"),
    emailPlaceholder: t("email.placeholder"),
    passwordLabel: t("password.label"),
    passwordPlaceholder: t("password.placeholder"),
    confirmPasswordLabel: t("confirmPassword.label"),
    confirmPasswordPlaceholder: t("confirmPassword.placeholder"),
    submit: t("submit"),
    authPromptMessage: t("authPrompt.message"),
    loginLinkText: t("authPrompt.loginLinkText"),
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/background-pizza.jpg')] bg-cover bg-center" />

      <section className="w-full min-h-[calc(100vh-114px)] flex items-center justify-center">
        <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-6 w-full mx-2 md:w-2/3 lg:w-2/4 shadow-md">
          <h2 className="text-2xl font-semibold text-center text-black mb-4">
            {registerTranslations.title}
          </h2>
          <SignUpForm t={registerTranslations} />
          <p className="mt-2 flex items-center justify-center gap-3 text-gray-500 text-sm">
            <span>{registerTranslations.authPromptMessage}</span>
            <Link href={routes.login} className="text-black font-semibold">
              {registerTranslations.loginLinkText}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
