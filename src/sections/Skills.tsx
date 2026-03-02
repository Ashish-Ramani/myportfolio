import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const skillRowsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const skills = [
    { category: 'Data Engineering', items: 'ETL Development, Medallion Architecture (Bronze/Silver/Gold), Batch & Incremental Processing, Data Lake Design, Schema Evolution' },
    { category: 'Programming', items: 'Python, PySpark, SQL, Java, PL/SQL, T-SQL, Bash' },
    { category: 'Cloud Platforms', items: 'Microsoft Azure, Microsoft Fabric, AWS (EC2, S3, Route 53, CloudWatch), GCP' },
    { category: 'Databases', items: 'SQL Server, PostgreSQL, MySQL, MongoDB, Oracle, Relational & NoSQL' },
    { category: 'Data Integration', items: 'REST API Ingestion, SFTP Pipelines, Structured Data Processing, Third-party Service Integration' },
    { category: 'Analytics & BI', items: 'Power BI Data Modeling, Data Transformation Engineering' },
    { category: 'DevOps & Tools', items: 'Docker, Kubernetes, Jenkins, CI/CD Pipelines, Git, GitHub Actions' },
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
        { x: '-70vw', rotateZ: -3, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right glass panel
      scrollTl.fromTo(
        panelRef.current,
        { x: '70vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Accent line
      scrollTl.fromTo(
        accentLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0
      );

      // Header
      scrollTl.fromTo(
        headerRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Skill rows stagger
      skillRowsRef.current.forEach((ref, i) => {
        scrollTl.fromTo(
          ref,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12 + i * 0.025
        );
      });

      // EXIT (70-100%)
      scrollTl.fromTo(
        imageCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      skillRowsRef.current.forEach((ref) => {
        scrollTl.fromTo(
          ref,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
      });

      scrollTl.fromTo(
        accentLineRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToSkillRefs = (el: HTMLDivElement | null) => {
    if (el && !skillRowsRef.current.includes(el)) {
      skillRowsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
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

      {/* Accent line */}
      <div
        ref={accentLineRef}
        className="absolute z-20 accent-line"
        style={{
          left: '6vw',
          top: '11vh',
          width: '60px',
          transformOrigin: 'left',
        }}
      />

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
          src="/skills_code_editor.jpg"
          alt="Code Editor"
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
              Skills & Tools
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#F2F5F9]">
              The Stack
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-6">
              {skills.map((skill) => (
                <div
                  key={skill.category}
                  ref={addToSkillRefs}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pb-4 border-b border-[rgba(242,245,249,0.08)]"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#A9B3C2] w-40 shrink-0">
                    {skill.category}
                  </span>
                  <span className="text-[#F2F5F9] font-medium">
                    {skill.items}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
