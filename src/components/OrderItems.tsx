import { orderWithProduct } from "@/types/product";
import { formatCurrency } from "@/utils/formatters";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface OrderItemsWithProduct {
  order: orderWithProduct;
}

const OrderItems = async ({ order }: OrderItemsWithProduct) => {
  const t = await getTranslations("admin.orders");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl italic text-center text-red-500 font-bold mb-6 uppercase">
        {t("orderDetailsTitle")}
      </h1>

      <ul className="space-y-6">
        {order.products.map((item) => {
          const rawExtras = item.extras;
          const extras = Array.isArray(rawExtras)
            ? (rawExtras as {
                name: string;
                id: string;
                price: number;
                productId: string;
              }[])
            : [];

          const extrasTotal = extras.reduce(
            (total, extra) => total + (extra.price || 0),
            0
          );

          const basePrice = item.product?.basePrice || 0;
          const totalPricePerItem =
            basePrice + (item.sizePrice || 0) + extrasTotal;

          return (
            <li key={item.id} className="border rounded-lg p-4">
              <div className="flex gap-6 flex-wrap sm:flex-nowrap">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>

                <div className="flex justify-between items-start w-full">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">
                      {item.product.name}
                    </h4>

                    <div className="flex items-start justify-between sm:justify-around flex-wrap gap-2 mt-1 text-sm text-gray-600 ">
                      <div className="space-y-1">
                        <div>Base price : {item.product.basePrice}</div>
                        {item.sizeName && (
                          <div>
                            <span>Size: </span>
                            {item.sizeName}
                            {item.sizePrice && (
                              <span className="ml-2">
                                – {formatCurrency(item.sizePrice)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {extras.length > 0 && (
                        <div>
                          <span>Extras:</span>
                          <ul className="ml-4 list-disc">
                            {extras.map((extra) => (
                              <li key={extra.id}>
                                {extra.name} – {formatCurrency(extra.price)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="font-medium text-sm">
                        Quantity: <strong>{item.quantity}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-lg font-semibold">
                    {formatCurrency(totalPricePerItem * item.quantity)}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 border-t pt-4 text-right space-y-2">
        <p className="text-sm text-gray-600">
          Delivery Fee:
          <strong className="text-black ml-2">
            {formatCurrency(order.amount - order.amount / 1.14)}
          </strong>
        </p>
        <p className="text-sm text-gray-600">
          Subtotal:
          <strong className="text-black ml-2">
            {formatCurrency(order.amount / 1.14)}
          </strong>
        </p>
        <p className="font-medium text-lg">
          Total:
          <strong className="text-black ml-2">
            {formatCurrency(order.amount)}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default OrderItems;
