import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import AnimatedSection from '@/components/AnimatedSection';
import { staggerContainerVariants, staggerItemVariants, buttonHoverVariants } from '@/lib/animations';
import monolithImg from '@/assets/monolith-collection.jpg';
import stillnessImg from '@/assets/stillness-collection.jpg';
import originImg from '@/assets/origin-collection.jpg';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addItem } = useCart();

  const collectionImages: Record<string, string> = {
    monolith: monolithImg,
    stillness: stillnessImg,
    origin: originImg,
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h1 className="font-serif text-2xl">Product not found</h1>
        <Link to="/collections" className="text-muted-foreground hover:text-foreground mt-4 inline-block">
          Return to Collections
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const productImage = collectionImages[product.collectionSlug] || monolithImg;

  return (
    <div className="min-h-screen pt-32 md:pt-40">
      <section className="section-padding pt-0">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to={`/collections/${product.collectionSlug}`}
              className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft size={14} />
              Back to {product.collection}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="aspect-square bg-secondary/30 mb-4 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="grid grid-cols-3 gap-4"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i} 
                    className="aspect-square bg-secondary/20 overflow-hidden"
                    variants={staggerItemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={productImage}
                      alt={`${product.name} view ${i}`}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-8"
            >
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                {product.collection}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
                {product.name}
              </h1>
              <p className="font-sans text-xl text-foreground mb-8">
                {formatPrice(product.price)}
              </p>

              <p className="font-sans text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Materials */}
              <div className="border-t border-border pt-6 mb-6">
                <h3 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Materials
                </h3>
                <p className="font-sans text-foreground">
                  {product.materials.join(' · ')}
                </p>
              </div>

              {/* Dimensions */}
              <div className="border-t border-border pt-6 mb-6">
                <h3 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Dimensions
                </h3>
                <p className="font-sans text-foreground">{product.dimensions}</p>
              </div>

              {/* Philosophy Note */}
              <div className="border-t border-border pt-6 mb-8">
                <h3 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Philosophy
                </h3>
                <p className="font-serif text-foreground italic leading-relaxed">
                  "{product.philosophy}"
                </p>
              </div>

              <button
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: productImage,
                    material: product.materials[0],
                  })
                }
                className="w-full font-sans text-sm tracking-widest uppercase bg-foreground text-background py-4 hover:bg-foreground/90 transition-colors"
              >
                Add to Cart
              </button>

              <p className="font-sans text-xs text-muted-foreground text-center mt-4">
                Made to order · 8-12 weeks delivery
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <AnimatedSection>
        <section className="section-padding bg-card mt-20">
          <div className="container-editorial text-center max-w-3xl">
            <p className="font-serif text-2xl md:text-3xl italic text-foreground leading-relaxed">
              Each piece is crafted with intention, designed to age gracefully and 
              become more beautiful with time.
            </p>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default ProductDetail;
