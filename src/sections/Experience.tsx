import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      role: 'Data Engineer',
      company: 'WeTechForU',
      location: 'Allen, Texas',
      period: 'Sep 2025 – Present',
      description:
        'Architected end-to-end ETL pipelines using PySpark and SQL to ingest operational data from REST APIs, SFTP feeds, and relational databases. Implemented Bronze/Silver/Gold medallion architecture, reducing pipeline errors by 40%.',
    },
    {
      role: 'Software Developer',
      company: 'Gopi Export LLC',
      location: 'Dallas, Texas',
      period: 'Aug 2024 – Present',
      description:
        'Maintained e-commerce platform on AWS (EC2, S3, Route 53, CloudWatch) achieving 99.9% uptime. Designed SQL-based data processing logic and built REST APIs for transactional systems.',
    },
    {
      role: 'Software Developer',
      company: 'Silverwing Technologies Pvt. Ltd.',
      location: 'Ahmedabad, India',
      period: 'Jun 2018 – Jul 2020',
      description:
        'Developed and optimized SQL Server queries, stored procedures, and indexing strategies. Built e-commerce features using Spring Boot and ReactJS, achieving 25% improvement in data accessibility.',
    },
    {
      role: 'Web Developer',
      company: 'Icon Websolution',
      location: 'Ahmedabad, India',
      period: 'Aug 2020 – Mar 2022',
      description:
        'Built database-integrated web applications using React, PostgreSQL, and MongoDB. Implemented CI/CD pipelines with Jenkins, GitHub Actions, and Docker. Improved mobile compatibility by 30%.',
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

      // Timeline items stagger
      timelineItemsRef.current.forEach((ref, i) => {
        scrollTl.fromTo(
          ref,
          { y: 22, opacity: 0 },
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

      timelineItemsRef.current.forEach((ref) => {
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

  const addToTimelineRefs = (el: HTMLDivElement | null) => {
    if (el && !timelineItemsRef.current.includes(el)) {
      timelineItemsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
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

      {/* Left Image Card - Hidden on mobile, visible on tablet+ */}
      <div
        ref={imageCardRef}
        className="hidden md:block absolute z-10 overflow-hidden rounded-[20px] lg:rounded-[28px]"
        style={{
          left: '5vw',
          top: '14vh',
          width: '44vw',
          height: '72vh',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}experience_office_night.jpg`}
          alt="Office at Night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07080A]/30" />
      </div>

      {/* Glass Panel - Full width on mobile, half on desktop */}
      <div
        ref={panelRef}
        className="absolute z-10 glass rounded-[20px] md:rounded-[28px] p-6 sm:p-8 md:p-6 lg:p-8 xl:p-10 mx-4 sm:mx-6 md:mx-0 md:right-[5vw] md:top-[14vh] w-[calc(100%-2rem)] md:w-[44vw] md:h-[72vh] max-h-[90vh]"
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div ref={headerRef} className="mb-6 md:mb-8 shrink-0">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-[#00D4AA] block mb-2 md:mb-3">
              Experience
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-[#F2F5F9]">
              Career Timeline
            </h2>
          </div>

          {/* Timeline */}
          <div className="flex-1 flex flex-col justify-center overflow-y-auto pr-1">
            <div className="space-y-6 md:space-y-7 lg:space-y-8">
              {experiences.map((exp) => (
                <div
                  key={exp.role}
                  ref={addToTimelineRefs}
                  className="relative pl-5 md:pl-6"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 timeline-dot" />

                  {/* Content */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 md:gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading text-base sm:text-lg font-semibold text-[#F2F5F9]">
                        {exp.role}
                      </h3>
                      <p className="text-[#A9B3C2] text-xs sm:text-sm">{exp.company}</p>
                      <p className="text-[#A9B3C2]/70 text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs text-[#00D4AA] shrink-0 mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
