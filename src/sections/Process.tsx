import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Database, Code2, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stepItemsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Discover',
      description: 'Map sources, constraints, and stakeholder needs',
      icon: Search,
    },
    {
      number: '02',
      title: 'Model',
      description: 'Design schemas, tests, and lineage',
      icon: Database,
    },
    {
      number: '03',
      title: 'Build',
      description: 'Pipelines, observability, and docs',
      icon: Code2,
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'BI-ready datasets + continuous refinement',
      icon: Rocket,
    },
  ];

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
      // Left image card
      scrollTl.fromTo(
        imageCardRef.current,
        { x: '-70vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right glass panel
      scrollTl.fromTo(
        panelRef.current,
        { x: '70vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Header
      scrollTl.fromTo(
        headerRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Step items stagger
      stepItemsRef.current.forEach((ref, i) => {
        scrollTl.fromTo(
          ref,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12 + i * 0.028
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

      stepItemsRef.current.forEach((ref) => {
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

  const addToStepRefs = (el: HTMLDivElement | null) => {
    if (el && !stepItemsRef.current.includes(el)) {
      stepItemsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-pinned flex items-center justify-center"
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

      {/* Left Image Card */}
      <div
        ref={imageCardRef}
        className="absolute z-10 overflow-hidden rounded-[28px]"
        style={{
          left: '5vw',
          top: '14vh',
          width: '44vw',
          height: '72vh',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}process_whiteboard.jpg`}
          alt="Process Whiteboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07080A]/30" />
      </div>

      {/* Right Glass Panel */}
      <div
        ref={panelRef}
        className="absolute z-10 glass rounded-[28px] p-8 md:p-10"
        style={{
          right: '5vw',
          top: '14vh',
          width: '44vw',
          height: '72vh',
        }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div ref={headerRef} className="mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#00D4AA] block mb-3">
              Process
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#F2F5F9]">
              How I Work
            </h2>
          </div>

          {/* Steps */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    ref={addToStepRefs}
                    className="p-5 rounded-2xl glass-light card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#00D4AA]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-[#00D4AA]">
                            {step.number}
                          </span>
                          <h3 className="font-heading text-lg font-semibold text-[#F2F5F9]">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-[#A9B3C2] text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
