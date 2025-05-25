import Image from "next/image";
import Link from "next/link";

interface PaymentConfirmProps {
  searchParams: Promise<{ orderId: string }>;
}

const PaymentConfirm = async ({ searchParams }: PaymentConfirmProps) => {
  const { orderId } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-114px)] ">
      <Image src="/verified.gif" alt="check" width={130} height={130} />
      <h2 className="text-[24px]">Payment Successful !</h2>
      <h2 className="text-[17px] text-center mt-6 text-gray-500">
        We sent an email with your order confirmation along with Digital Content
      </h2>
      <Link
        href={`/order-details/${orderId}`}
        className="p-2 mt-6 text-white rounded-md bg-red-500"
      >
        View Order Details
      </Link>
    </div>
  );
};

export default PaymentConfirm;
