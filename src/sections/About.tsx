import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

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
        },
      });

      // ENTRANCE (0-30%)
      // Left image card with 3D rotation
      scrollTl.fromTo(
        imageCardRef.current,
        { x: '-70vw', rotateY: 14, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right glass panel with 3D rotation
      scrollTl.fromTo(
        panelRef.current,
        { x: '70vw', rotateY: -10, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Header
      scrollTl.fromTo(
        headerRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Content paragraphs + CTA stagger
      contentRefs.current.forEach((ref, i) => {
        scrollTl.fromTo(
          ref,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14 + i * 0.035
        );
      });

      // EXIT (70-100%)
      scrollTl.fromTo(
        imageCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      contentRefs.current.forEach((ref) => {
        scrollTl.fromTo(
          ref,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToContentRefs = (el: HTMLDivElement | null) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned flex items-center justify-center perspective-1000"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(14, 17, 22, 0.6) 0%, #07080A 100%)',
          }}
        />
      </div>

      {/* Left Image Card - Hidden on mobile */}
      <div
        ref={imageCardRef}
        className="hidden md:block absolute z-10 overflow-hidden rounded-[20px] lg:rounded-[28px] preserve-3d"
        style={{
          left: '5vw',
          top: '14vh',
          width: '44vw',
          height: '72vh',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}about_workspace.jpg`}
          alt="Workspace"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07080A]/30" />
      </div>

      {/* Glass Panel - Full width on mobile, half on desktop */}
      <div
        ref={panelRef}
        className="absolute z-10 glass rounded-[20px] md:rounded-[28px] p-6 sm:p-8 md:p-6 lg:p-8 xl:p-10 preserve-3d mx-4 sm:mx-6 md:mx-0 md:right-[5vw] md:top-[14vh] w-[calc(100%-2rem)] md:w-[44vw] md:h-[72vh] max-h-[90vh]"
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div ref={headerRef} className="mb-6 md:mb-8 shrink-0">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-[#00D4AA] block mb-2 md:mb-3">
              About
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-[#F2F5F9]">
              Behind the Data
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center overflow-y-auto pr-1">
            <div className="space-y-4 md:space-y-5">
              <div ref={addToContentRefs}>
                <p className="text-sm sm:text-base text-[#A9B3C2] leading-relaxed">
                  Results-driven Data Engineer with 4+ years of experience designing
                  and delivering scalable data pipelines, ETL workflows, and cloud-based
                  lakehouse architectures. I translate complex business requirements
                  into reliable, testable, and high-performance data systems.
                </p>
              </div>

              <div ref={addToContentRefs}>
                <p className="text-sm sm:text-base text-[#A9B3C2] leading-relaxed">
                  Proven expertise in PySpark, SQL, and Microsoft Fabric with deep
                  knowledge of medallion (Bronze/Silver/Gold) architecture, incremental
                  data processing, and analytics-ready data modeling.
                </p>
              </div>

              <div ref={addToContentRefs}>
                <p className="text-sm sm:text-base text-[#A9B3C2] leading-relaxed">
                  MS in Computer Science from Texas Tech University (GPA: 3.61/4.0).
                  Certified in Google Cloud and IBM Data Analytics. I combine strong
                  software engineering fundamentals with modern data engineering practices.
                </p>
              </div>

              <div ref={addToContentRefs} className="pt-3 md:pt-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-[#00D4AA] font-medium link-underline"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
