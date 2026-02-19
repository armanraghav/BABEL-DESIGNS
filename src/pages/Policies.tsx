import { Link } from 'react-router-dom';

const Policies = () => {
  return (
    <div className="min-h-screen pt-32 md:pt-40">
      <section className="section-padding pt-0">
        <div className="container-editorial max-w-4xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Policies</p>
          <h1 className="mb-8 font-serif text-4xl md:text-5xl font-light">Delivery, returns, and warranty</h1>

          <div className="space-y-8">
            <div className="border border-border bg-card p-6">
              <h2 className="mb-3 font-serif text-2xl">Delivery</h2>
              <p className="text-muted-foreground">Made-to-order pieces ship in 8-12 weeks depending on material and finish selection. White-glove delivery options are available for major cities.</p>
            </div>

            <div className="border border-border bg-card p-6">
              <h2 className="mb-3 font-serif text-2xl">Returns</h2>
              <p className="text-muted-foreground">Custom and made-to-order furniture is final sale. If an item arrives damaged, report within 48 hours with images for replacement support.</p>
            </div>

            <div className="border border-border bg-card p-6">
              <h2 className="mb-3 font-serif text-2xl">Warranty</h2>
              <p className="text-muted-foreground">Each piece includes a 24-month workmanship warranty covering structural manufacturing defects under normal residential use.</p>
            </div>
          </div>

          <div className="mt-12">
            <Link to="/consultancy" className="border border-foreground/30 px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors">
              Contact design team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policies;
