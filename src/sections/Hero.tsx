import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background fade in
      tl.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      );

      // Glass card entrance
      tl.fromTo(
        cardRef.current,
        { y: 24, scale: 0.98, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.7 },
        '-=0.3'
      );

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.5 },
          '-=0.4'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set(cardRef.current, { y: 0, opacity: 1 });
            gsap.set(bgRef.current, { scale: 1, opacity: 1 });
          },
        },
      });

      // ENTRANCE (0-30%): Hold - entrance handled by mount animation
      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.85, ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src={`${import.meta.env.BASE_URL}hero_bg_city.jpg`}
          alt="Night city skyline"
          className="bg-image"
        />
        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(7, 8, 10, 0.9) 100%)',
          }}
        />
      </div>

      {/* Glass Card */}
      <div
        ref={cardRef}
        className="relative z-10 glass rounded-[20px] md:rounded-[28px] p-6 sm:p-8 md:p-10 lg:p-12 mx-4 sm:mx-6 md:mx-auto"
        style={{
          width: 'min(92vw, 1100px)',
          minHeight: 'min(50vh, 480px)',
          maxHeight: '90vh',
          opacity: 0,
        }}
      >
        {/* Content */}
        <div className="h-full flex flex-col justify-between gap-4 sm:gap-6">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#F2F5F9] tracking-tight leading-none"
          >
            <span className="word inline-block">Ashish</span>{' '}
            <span className="word inline-block">Ramani</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-[#A9B3C2] max-w-full sm:max-w-[85%] md:max-w-[70%] leading-relaxed"
            style={{ opacity: 0 }}
          >
            Data Engineer with 4+ years of experience designing scalable data pipelines,
            ETL workflows, and cloud-based lakehouse architectures. Expert in PySpark, SQL,
            and Microsoft Fabric with deep knowledge of medallion (Bronze/Silver/Gold) architecture.
            Based in Dallas, Texas.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <button onClick={scrollToProjects} className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3">
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={scrollToContact} className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3">
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Top Navigation (visible on hero) */}
      <div className="absolute top-4 sm:top-6 left-0 right-0 z-20 px-4 sm:px-6 md:px-[4vw]">
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg sm:text-xl font-bold text-[#F2F5F9]">
            AR
          </span>
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            {['Work', 'Skills', 'About', 'Contact'].map((item) => (
              <span
                key={item}
                className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-[#A9B3C2] hover:text-[#F2F5F9] transition-colors cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
