import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface PaymentConfirmProps {
  searchParams: Promise<{ orderId: string }>;
}

const PaymentConfirm = async ({ searchParams }: PaymentConfirmProps) => {
  const { orderId } = await searchParams;

  const t = await getTranslations("messages.paymentConfirm");

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-114px)] ">
      <Image src="/verified.gif" alt="check" width={130} height={130} />

      <h2 className="text-[24px]">{t("title")}</h2>

      <h2 className="text-[17px] text-center mt-6 text-gray-500">
        {t("message")}
      </h2>

      <Link
        href={`/order-details/${orderId}`}
        className="p-2 mt-6 text-white rounded-md bg-red-500"
      >
        {t("viewOrder")}
      </Link>
    </div>
  );
};

export default PaymentConfirm;
