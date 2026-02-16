import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLAnchorElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/collections', label: 'Collections' },
    { path: '/philosophy', label: 'Philosophy' },
    { path: '/consultancy', label: 'Consultancy' },
  ];

  // Initial navbar entrance animation
  useEffect(() => {
    if (!navRef.current) return;

    const timeline = gsap.timeline();

    // Navbar slides down and fades in
    timeline.from(navRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Logo animates in
    if (logoRef.current) {
      timeline.from(
        logoRef.current,
        {
          opacity: 0,
          x: -30,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.6'
      );
    }

    // Navigation links stagger in
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('a');
      timeline.from(
        links,
        {
          opacity: 0,
          x: 20,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.4'
      );
    }

    // Cart icon animates in
    if (cartRef.current) {
      timeline.from(
        cartRef.current,
        {
          opacity: 0,
          x: 30,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.5'
      );
    }
  }, []);

  // Animate badge when totalItems changes
  useEffect(() => {
    if (badgeRef.current && totalItems > 0) {
      gsap.to(badgeRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  }, [totalItems]);

  const handleNavLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    gsap.to(target, {
      color: 'var(--foreground)',
      y: -1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleNavLinkHoverEnd = (e: React.MouseEvent<HTMLAnchorElement>, isActivePath: boolean) => {
    const target = e.currentTarget;
    gsap.to(target, {
      color: isActivePath ? 'var(--foreground)' : 'var(--muted-foreground)',
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleLogoHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('h1'), {
      color: 'var(--muted-foreground)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleLogoHoverEnd = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('h1'), {
      color: 'var(--foreground)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleCartHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: -1,
      scale: 1.04,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleCartHoverEnd = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm"
    >
      <div className="container-editorial">
        <div className="flex items-center justify-between py-6 pl-0 pr-6 md:pr-12 lg:pr-20">
          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            className="group -ml-4 md:-ml-8 lg:-ml-12"
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoHoverEnd}
            data-cursor="Home"
          >
            <h1 className="logo-title text-xl md:text-2xl font-light tracking-widest text-foreground">
              BABEL DESIGNS
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-12" ref={linksRef}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-sm tracking-widest uppercase ${
                  isActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={(e) => handleNavLinkHoverEnd(e, isActive(link.path))}
                data-cursor="Open"
              >
                {link.label}
              </Link>
            ))}

            {/* Cart */}
            <Link
              to="/cart"
              ref={cartRef}
              className="relative ml-1 flex items-center text-foreground transition-opacity hover:opacity-70"
              aria-label="Cart"
              onMouseEnter={handleCartHover}
              onMouseLeave={handleCartHoverEnd}
              data-cursor="Cart"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {totalItems > 0 && (
                <span
                  ref={badgeRef}
                  className="absolute -top-2 -right-2 flex h-5 w-5 scale-0 items-center justify-center rounded-full bg-foreground font-sans text-xs text-background opacity-0"
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center gap-6">
            <Link
              to="/cart"
              className="relative text-foreground transition-opacity hover:opacity-70"
              aria-label="Cart"
              onMouseEnter={handleCartHover}
              onMouseLeave={handleCartHoverEnd}
              data-cursor="Cart"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center rounded-full font-sans">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden border-t border-border px-6 py-4">
          <div className="flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-xs tracking-widest uppercase ${
                  isActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={(e) => handleNavLinkHoverEnd(e, isActive(link.path))}
                data-cursor="Open"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
