import OrderItems from "@/components/OrderItems";
import { Link } from "@/i18n/navigation";
import { getOrder } from "@/server/db/orders";
import { notFound } from "next/navigation";


interface OrderDetailsPageProps {
  params: Promise<{ orderId: string }>;
}

const OrderDetailsPage = async ({ params }: OrderDetailsPageProps) => {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) notFound();

  return (
    <>
      <OrderItems order={order} />

      <Link
        href="/"
        className="block py-2 px-4 mt-7 mb-10 mx-auto  w-fit text-white rounded-md bg-red-500"
      >
        Back to Home
      </Link>
    </>
  );
};

export default OrderDetailsPage;
