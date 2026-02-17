import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';
import { toast } from 'sonner';
import { isSupabaseConfigured } from '@/integrations/supabase/client';
import { createStudioDispatchSubscription } from '@/integrations/supabase/studio_dispatch';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!trimmed || !isValidEmail) {
      toast.error('Enter a valid email address.');
      return;
    }

    if (!isSupabaseConfigured) {
      toast.error('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createStudioDispatchSubscription({ email: trimmed });
      toast.success('Subscribed. Welcome to Studio Dispatch.');
      setEmail('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to subscribe';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-secondary/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-accent/40 blur-3xl" />
      </div>

      <div className="container-editorial section-padding relative z-10">
        <motion.div
          className="mb-16 grid grid-cols-1 gap-10 border border-border/60 bg-background/60 p-8 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="section-overline mb-4">Studio Dispatch</p>
            <h3 className="section-title mb-4">Receive notes from the atelier</h3>
            <p className="section-copy max-w-md">
              New collection studies, material insights, and project stories. Quietly delivered.
            </p>
          </div>
          <form className="flex flex-col justify-center gap-4 sm:flex-row sm:items-end" onSubmit={handleSubscribe}>
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 flex-1 border border-border bg-background px-4 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
            />
            <button
              type="submit"
              data-cursor="Join"
              disabled={isSubmitting}
              className="h-12 border border-foreground/30 px-6 font-sans text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background disabled:opacity-60"
            >
              {isSubmitting ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={staggerItemVariants} className="md:col-span-2">
            <motion.h3
              className="font-serif text-2xl font-light tracking-widest mb-6 transition-colors duration-300"
              whileHover={{ color: 'var(--foreground)' }}
              transition={{ duration: 0.3 }}
            >
              BABEL DESIGNS
            </motion.h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-md">
              Muted luxury. Universal design. Crafted from stone, wood, metal, and intention -
              design that transcends language, culture, and time.
            </p>
            <p className="mt-8 font-serif text-lg italic text-foreground/80">
              "Design that unites all diversities."
            </p>
          </motion.div>

          <motion.div variants={staggerItemVariants}>
            <h4 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-6">
              Navigate
            </h4>
            <motion.ul className="space-y-3" variants={staggerContainerVariants}>
              {[
                { path: '/collections', label: 'Collections' },
                { path: '/philosophy', label: 'Philosophy' },
                { path: '/consultancy', label: 'Consultancy' },
              ].map((link) => (
                <motion.li key={link.path} variants={staggerItemVariants}>
                  <Link
                    to={link.path}
                    data-cursor="Open"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                  >
                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={staggerItemVariants}>
            <h4 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-6">
              Connect
            </h4>
            <motion.ul className="space-y-3" variants={staggerContainerVariants}>
              <motion.li variants={staggerItemVariants}>
                <a
                  href="mailto:studio@babeldesigns.com"
                  data-cursor="Email"
                  className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  <motion.span
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    studio@babeldesigns.com
                  </motion.span>
                </a>
              </motion.li>
              <motion.li variants={staggerItemVariants}>
                <span className="font-sans text-sm text-muted-foreground">By appointment only</span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-sans text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Babel Designs. All rights reserved.
          </p>
          <p className="font-serif text-sm italic text-muted-foreground">Crafted forms. Deliberate materials.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
