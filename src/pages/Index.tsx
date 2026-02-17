import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import AnimatedSection from '@/components/AnimatedSection';
import { 
  staggerContainerVariants, 
  staggerItemVariants, 
  heroHeadingVariants,
  heroSubheadingVariants,
  heroCTAVariants,
  imageZoomInVariants
} from '@/lib/animations';
import heroBg from '@/assets/homepagebg.jpeg';
import monolithImg from '@/assets/monolith-collection.jpg';
import stillnessImg from '@/assets/stillness-collection.jpg';
import originImg from '@/assets/origin-collection.jpg';
import { fetchCollections } from '@/integrations/supabase/catalog';

const Index = () => {
  const { scrollY } = useScroll();
  const heroOffset = useTransform(scrollY, [0, 600], [0, 90]);
  const { data: collections = [] } = useQuery({
    queryKey: ['collections'],
    queryFn: fetchCollections,
  });

  const fallbackCollections = [
    {
      slug: 'monolith',
      name: 'The Monolith Collection',
      tagline: 'Permanence in form',
    },
    {
      slug: 'stillness',
      name: 'The Stillness Collection',
      tagline: 'Quiet refinement',
    },
    {
      slug: 'origin',
      name: 'The Origin Series',
      tagline: 'Return to essence',
    },
  ];

  const previewCollections = collections.length > 0 ? collections : fallbackCollections;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden section-transition">
        {/* Background Image */}
        <motion.div
          variants={imageZoomInVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0"
          style={{ y: heroOffset }}
        >
          <img
            src={heroBg}
            alt="Babel Designs architectural interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/65" />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={staggerItemVariants}
            className="font-sans text-sm tracking-[0.3em] uppercase text-primary-foreground/80 mb-6"
          >
            Muted Luxury · Universal Design
          </motion.p>

          <motion.h1
            variants={heroHeadingVariants}
            className="logo-title text-5xl md:text-7xl lg:text-7xl font-light tracking-wide text-primary-foreground mb-8"
          >
            BABEL DESIGNS
          </motion.h1>

          <motion.p
            variants={heroSubheadingVariants}
            className="font-sans text-sm md:text-base uppercase tracking-[0.35em] text-primary-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Crafted for all, Owned by few.
          </motion.p>

          <motion.div
            variants={heroCTAVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/collections"
                data-cursor="Explore"
                className="group flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-primary-foreground border border-primary-foreground/40 px-8 py-4 hover:bg-primary-foreground hover:text-foreground transition-all duration-500"
              >
                Explore Collections
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/consultancy"
                data-cursor="Book"
                className="font-sans text-sm tracking-widest uppercase text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Book Consultancy
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-16 bg-gradient-to-b from-primary-foreground/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* Collections Preview */}
      <section className="section-padding section-transition">
        <div className="container-editorial">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {previewCollections.map((collection) => (
              <motion.div
                key={collection.slug}
                variants={staggerItemVariants}
              >
                <Link
                  to={`/collections/${collection.slug}`}
                  className="group block card-hover-lift"
                  data-cursor="View"
                >
                  <motion.div 
                    className="aspect-[4/5] overflow-hidden mb-6 relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </motion.div>
                  <div className="h-px w-0 bg-foreground/45 transition-all duration-500 group-hover:w-20 mb-4" />
                  <motion.h3 
                    className="font-serif text-xl font-light text-foreground mb-2 group-hover:text-muted-foreground transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {collection.name}
                  </motion.h3>
                  <p className="font-sans text-sm text-muted-foreground italic">
                    {collection.tagline}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="text-center mt-16">
            <Link
              to="/collections"
              data-cursor="Browse"
              className="inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-foreground border-b border-foreground/30 pb-2 hover:border-foreground transition-colors"
            >
              View All Collections
              <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Lookbook Strip */}
      <section className="section-padding pt-6 section-transition">
        <div className="container-editorial">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-overline mb-3">Lookbook</p>
              <h2 className="section-title">Composed Spaces</h2>
            </div>
            <p className="section-copy max-w-xl">
              A visual study in proportion, texture, and atmosphere. Scroll horizontally to explore curated moments.
            </p>
          </div>

          <div className="lookbook-snap flex gap-6 overflow-x-auto pb-4">
            {[
              { img: monolithImg, title: 'Stone Presence' },
              { img: stillnessImg, title: 'Quiet Materiality' },
              { img: originImg, title: 'Raw Geometry' },
              { img: heroBg, title: 'Layered Interiors' },
            ].map((item) => (
              <div
                key={item.title}
                className="lookbook-item group relative min-w-[78vw] md:min-w-[48vw] lg:min-w-[36vw] card-hover-lift"
              >
                <div className="aspect-[16/10] overflow-hidden border border-border/70 bg-card/50">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-serif text-xl text-foreground">{item.title}</p>
                  <span className="section-overline">Edition</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Teaser */}
      <section className="section-padding bg-card section-transition">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
                Our Philosophy
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-8">
                Design has no language,<br />
                no boundaries, no culture.
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Inspired by the Tower of Babel, we believe in design that unites rather than divides. 
                Each piece speaks a universal language of form, material, and intention — 
                understood across all cultures and eras.
              </p>
              <Link
                to="/philosophy"
                data-cursor="Read"
                className="inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-foreground border-b border-foreground/30 pb-2 hover:border-foreground transition-colors"
              >
                Read Our Philosophy
                <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="relative">
              <div className="aspect-square bg-secondary/50 flex items-center justify-center">
                <div className="text-center p-12">
                  <p className="font-serif text-2xl md:text-3xl italic text-foreground leading-relaxed">
                    "Minimalism achieved through integration,<br />
                    not removal."
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-foreground text-primary-foreground section-transition">
        <div className="container-editorial text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
              Design that unites<br />
              all diversities.
            </h2>
            <Link
              to="/consultancy"
              data-cursor="Start"
              className="inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase border border-primary-foreground/40 px-8 py-4 hover:bg-primary-foreground hover:text-foreground transition-all duration-500"
            >
              Begin with Babel
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
