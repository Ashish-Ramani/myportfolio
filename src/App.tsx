import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import About from './sections/About';
import Process from './sections/Process';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Navigation from './components/Navigation';
import AnimatedBackground from './components/AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optimized ScrollTrigger setup with debouncing
    let timer: NodeJS.Timeout;
    let rafId: number;

    const setupSnap = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const pinned = ScrollTrigger.getAll()
          .filter(st => st.vars.pin)
          .sort((a, b) => a.start - b.start);
        
        const maxScroll = ScrollTrigger.maxScroll(window);
        
        if (!maxScroll || pinned.length === 0) return;

        // Build ranges and snap targets from pinned sections
        const pinnedRanges = pinned.map(st => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        // Global snap configuration
        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              // Check if within any pinned range (allow small buffer)
              const inPinned = pinnedRanges.some(
                r => value >= r.start - 0.02 && value <= r.end + 0.02
              );
              
              if (!inPinned) return value; // Flowing section: free scroll

              // Find nearest pinned center
              const target = pinnedRanges.reduce(
                (closest, r) =>
                  Math.abs(r.center - value) < Math.abs(closest - value)
                    ? r.center
                    : closest,
                pinnedRanges[0]?.center ?? 0
              );
              
              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out',
          },
        });
      });
    };

    // Debounced setup
    timer = setTimeout(setupSnap, 300);

    // Optimize ScrollTrigger refresh
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#07080A]">
      {/* Animated 3D Background */}
      <AnimatedBackground />
      
      {/* Grain overlay */}
      <div className="grain" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections with z-index stacking */}
      <main className="relative">
        <section className="relative z-10">
          <Hero />
        </section>
        <section className="relative z-20">
          <Projects />
        </section>
        <section className="relative z-30">
          <Skills />
        </section>
        <section className="relative z-40">
          <Experience />
        </section>
        <section className="relative z-50">
          <About />
        </section>
        <section className="relative z-[60]">
          <Process />
        </section>
        <section className="relative z-[70]">
          <Contact />
        </section>
        <section className="relative z-[80]">
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default App;
