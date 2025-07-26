import ButtonSpinner from "@/components/ButtonSpinner";
import { createNewOrder } from "@/server/actions/order";
import { removeItemFromCart, selectCartItems } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { DOMAIN } from "@/utils/constants";
import { Order } from "@prisma/client";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm = ({ amount }: CheckoutFormProps) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const session = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const locale = useLocale();
  const trans = useTranslations("messages");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    try {
      setLoading(true);

      // Validate form
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.error(submitError.message);
        return;
      }

      // Create payment intent
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const responseData = await res.json();

      let orderRes: Order | null = null;

      if (!res.ok || !responseData.clientSecret) {
        toast.error(trans("paymentCreationFailed"));
        return;
      } else {
        // create order
        orderRes = (await createOrder()) as Order;

        if (!orderRes) return;

        //send email
        await sendEmail(orderRes);
        toast.success(trans("paymentSuccessWithEmail"));
      }

      const clientSecret = responseData.clientSecret;

      // Confirm payment
      const result = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: `${DOMAIN}/${locale}/payment-confirm?orderId=${orderRes.id}`,
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        return;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error(trans("unexpectedError"));
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    if (!session.data?.user) {
      toast.info(trans("userNotFound"));
      return;
    }

    const productItems = cart?.map((item) => ({
      productId: item.id,
      quantity: item.quantity ?? 1,
      size: item.size,
      extras: item.extras,
      userId: session.data?.user.id,
    }));

    const orderData = {
      userName: session.data.user.name,
      email: session.data.user.email,
      phone: session.data.user.phone ?? "",
      streetAddress: session.data.user.streetAddress ?? "",
      postalCode: session.data.user.postalCode ?? "",
      city: session.data.user.city ?? "",
      country: session.data.user.country ?? "",
      amount,
      productItems,
    };

    try {
      const result = await createNewOrder(orderData, locale);
      if (result.status === 201) {
        cart.forEach((item) => dispatch(removeItemFromCart({ id: item?.id })));
        localStorage.removeItem("cartItems");
        toast.success(result.message);

        return result.order;
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Order creation failed:", err);
      alert(trans("orderFailed"));
    }
  };

  const sendEmail = async (order: Order) => {
    if (!session.data?.user) {
      toast.info(trans("userNotFound"));
      return;
    }

    await fetch("api/send-email", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
        email: session.data.user.email,
        fullName: session.data.user.name,
        orderId: order.id,
      }),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container w-full md:w-2/3 lg:w-2/4 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] my-10"
    >
      <div className="w-full">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-5 bg-red-500 text-white rounded-md py-3 text-lg hover:bg-red-600 transition-colors"
      >
        {loading ? <ButtonSpinner /> : "Submit"}
      </button>
    </form>
  );
};

export default CheckoutForm;
