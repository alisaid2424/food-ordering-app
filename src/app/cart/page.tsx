import CartItems from "./_components/CartItems";

const CartPage = () => {
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-red-500 text-center font-bold text-4xl italic mb-10">
            Cart
          </h1>

          <CartItems />
        </div>
      </section>
    </main>
  );
};

export default CartPage;
