import { Link, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const shortRef = orderId ? orderId.slice(0, 8).toUpperCase() : "-";

  return (
    <div className="min-h-screen pt-32 md:pt-40">
      <section className="section-padding pt-0">
        <div className="container-editorial max-w-3xl text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Payment Confirmed</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Thank you for your order</h1>
          <p className="font-sans text-muted-foreground mb-10">
            Your transaction was successful. Save your reference for support and delivery updates.
          </p>

          <div className="mx-auto mb-10 max-w-md border border-border bg-card p-6">
            <p className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Reference</p>
            <p className="font-mono text-2xl">{shortRef}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/collections" className="border border-foreground/40 px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors">
              Continue Browsing
            </Link>
            <Link to="/consultancy" className="border border-foreground/20 px-8 py-3 text-sm uppercase tracking-[0.2em] hover:border-foreground transition-colors">
              Book Design Consultancy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderSuccess;
