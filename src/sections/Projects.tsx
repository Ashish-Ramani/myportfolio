import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);

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
      // Left image panel
      scrollTl.fromTo(
        imagePanelRef.current,
        { x: '-60vw', rotateY: 18, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right glass card
      scrollTl.fromTo(
        cardRef.current,
        { x: '60vw', rotateY: -14, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Counter
      scrollTl.fromTo(
        counterRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Text elements stagger
      textRefs.current.forEach((ref, i) => {
        scrollTl.fromTo(
          ref,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1 + i * 0.03
        );
      });

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        imagePanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      textRefs.current.forEach((ref) => {
        scrollTl.fromTo(
          ref,
          { y: 0, opacity: 1 },
          { y: -12, opacity: 0, ease: 'power2.in' },
          0.7
        );
      });

      scrollTl.fromTo(
        counterRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToTextRefs = (el: HTMLDivElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-pinned flex items-center justify-center"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(14, 17, 22, 0.5) 0%, #07080A 100%)',
          }}
        />
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        className="absolute z-20 flex items-center gap-3"
        style={{ left: '6vw', top: '9vh' }}
      >
        <div className="w-2 h-2 rounded-full bg-[#00D4AA]" />
        <span className="font-mono text-sm text-[#A9B3C2]">01</span>
      </div>

      {/* Left Image Panel */}
      <div
        ref={imagePanelRef}
        className="absolute z-10 overflow-hidden rounded-[28px]"
        style={{
          left: '5vw',
          top: '14vh',
          width: '56vw',
          height: '72vh',
        }}
      >
        <img
          src="/project_01_pipeline.jpg"
          alt="Data Pipeline Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080A]/60 to-transparent" />
      </div>

      {/* Right Glass Card */}
      <div
        ref={cardRef}
        className="absolute z-10 glass rounded-[28px] p-8 md:p-10"
        style={{
          right: '5vw',
          top: '14vh',
          width: '32vw',
          height: '72vh',
        }}
      >
        <div className="h-full flex flex-col">
          {/* Label */}
          <div ref={addToTextRefs} className="mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#00D4AA]">
              Featured Project
            </span>
          </div>

          {/* Title */}
          <div ref={addToTextRefs} className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[#F2F5F9] leading-tight">
              Malicious Website Detection Using ML
            </h2>
          </div>

          {/* Body */}
          <div ref={addToTextRefs} className="flex-1">
            <p className="text-[#A9B3C2] leading-relaxed">
              Engineered a machine learning pipeline to classify malicious URLs
              (phishing, malware, defacement, benign) using Random Forest, XGBoost,
              and LightGBM models trained on 651,000+ URLs. Extracted and engineered
              URL features including length, suspicious keywords, special characters,
              and directory depth for high-accuracy threat detection.
            </p>
          </div>

          {/* Tags */}
          <div ref={addToTextRefs} className="mb-6">
            <div className="flex flex-wrap gap-2">
              {['Python', 'Machine Learning', 'Random Forest', 'XGBoost', 'LightGBM'].map(
                (tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Link */}
          <div ref={addToTextRefs}>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#00D4AA] font-medium link-underline"
            >
              Read case study
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
