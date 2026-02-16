import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { staggerContainerVariants, staggerItemVariants, imageZoomInVariants } from '@/lib/animations';
import monolithImg from '@/assets/monolith-collection.jpg';
import stillnessImg from '@/assets/stillness-collection.jpg';
import originImg from '@/assets/origin-collection.jpg';

const Collections = () => {
  const collections = [
    {
      slug: 'monolith',
      name: 'The Monolith Collection',
      tagline: 'Permanence in form',
      description:
        'Inspired by ancient stone monuments, each piece embodies weight, presence, and timeless stability. Crafted from solid materials that age gracefully.',
      image: monolithImg,
    },
    {
      slug: 'stillness',
      name: 'The Stillness Collection',
      tagline: 'Quiet refinement',
      description:
        'Furniture designed for contemplation. Clean lines, soft curves, and materials that invite pause. A meditation on space and silence.',
      image: stillnessImg,
    },
    {
      slug: 'origin',
      name: 'The Origin Series',
      tagline: 'Return to essence',
      description:
        'Stripped to fundamental forms, this collection celebrates raw materials in their most honest expression. Wood grain, stone texture, metal patina.',
      image: originImg,
    },
  ];

  return (
    <div className="min-h-screen pt-32 md:pt-40">
      {/* Header */}
      <section className="section-padding pt-0 section-transition">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Collections
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
              Concept-Driven Design
            </h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Each collection represents a distinct philosophy — a meditation on material, 
              form, and the spaces we inhabit. Not products, but ideas made tangible.
            </p>
          </motion.div>

          {/* Collections Grid */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-24 md:space-y-32"
          >
            {collections.map((collection, index) => (
              <motion.div
                key={collection.slug}
                variants={staggerItemVariants}
              >
                <Link
                  to={`/collections/${collection.slug}`}
                  data-cursor="View"
                  className={`group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center card-hover-lift ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <motion.div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <motion.div
                      className="aspect-[4/3] overflow-hidden relative border border-border/40"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: index % 2 === 1 ? 40 : -40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                      <motion.p 
                        className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4"
                        whileHover={{ y: -2, opacity: 0.85 }}
                        transition={{ duration: 0.4 }}
                      >
                        {collection.tagline}
                      </motion.p>
                    <motion.h2 
                      className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 group-hover:text-muted-foreground transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      {collection.name}
                    </motion.h2>
                    <p className="font-sans text-muted-foreground leading-relaxed mb-8 max-w-md">
                      {collection.description}
                    </p>
                    <span className="mb-4 block h-px w-0 bg-foreground/40 transition-all duration-500 group-hover:w-24" />
                    <motion.span 
                      className="inline-block font-sans text-sm tracking-widest uppercase text-foreground border-b border-foreground/30 pb-2 group-hover:border-foreground transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      Explore Collection
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Studio Notes */}
          <div className="mt-28 md:mt-36">
            <div className="text-center mb-14">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Studio Notes
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6">
                Materials, Light, and Time
              </h2>
              <p className="font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Behind each collection is a quiet study of texture and proportion. These notes reflect the
                ongoing dialogue between raw material and refined form.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-secondary/40 border border-border/60 rounded-2xl overflow-hidden card-hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={monolithImg}
                    alt="Stone study"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
                    Stone Study
                  </p>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Dense, grounded forms that anchor a room. A material that holds memory in its surface.
                  </p>
                </div>
              </div>

              <div className="bg-secondary/40 border border-border/60 rounded-2xl overflow-hidden card-hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={stillnessImg}
                    alt="Soft light"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
                    Soft Light
                  </p>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Linen, oak, and rounded edges invite the eye to linger. A calm rhythm for daily rituals.
                  </p>
                </div>
              </div>

              <div className="bg-secondary/40 border border-border/60 rounded-2xl overflow-hidden card-hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={originImg}
                    alt="Raw materials"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
                    Raw Origin
                  </p>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Unfinished textures, honest joinery, and the beauty of a material left to speak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
