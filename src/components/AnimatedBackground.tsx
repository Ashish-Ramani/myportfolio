import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const shapesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating particles
    const particleCount = 30;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'animated-particle';
      
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Animate particles with GSAP
    particles.forEach((particle) => {
      const duration = Math.random() * 25 + 20;
      const delay = Math.random() * 3;
      
      gsap.to(particle, {
        y: `+=${Math.random() * 300 + 200}`,
        x: `+=${(Math.random() - 0.5) * 150}`,
        rotation: Math.random() * 720,
        opacity: Math.random() * 0.5 + 0.2,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: 'none',
      });
    });

    // Create floating geometric shapes
    const shapeCount = 8;
    const shapes: HTMLDivElement[] = [];

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      shape.className = 'animated-shape';
      
      const size = Math.random() * 80 + 40;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.opacity = `${Math.random() * 0.15 + 0.05}`;
      
      // Random shape type
      const shapeType = Math.floor(Math.random() * 3);
      if (shapeType === 0) {
        shape.style.borderRadius = '50%';
        shape.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.1), rgba(0, 212, 170, 0.05))';
      } else if (shapeType === 1) {
        shape.style.borderRadius = '20%';
        shape.style.background = 'linear-gradient(45deg, rgba(0, 212, 170, 0.08), transparent)';
        shape.style.transform = 'rotate(45deg)';
      } else {
        shape.style.borderRadius = '0%';
        shape.style.background = 'linear-gradient(90deg, rgba(0, 212, 170, 0.1), transparent)';
        shape.style.transform = 'rotate(30deg)';
      }
      
      containerRef.current.appendChild(shape);
      shapes.push(shape);
    }

    shapesRef.current = shapes;

    // Animate shapes with 3D rotation
    shapes.forEach((shape) => {
      const duration = Math.random() * 30 + 25;
      const delay = Math.random() * 5;
      
      gsap.to(shape, {
        y: `+=${Math.random() * 400 + 300}`,
        x: `+=${(Math.random() - 0.5) * 200}`,
        rotation: `+=${Math.random() * 360 + 180}`,
        scale: Math.random() * 0.5 + 0.8,
        opacity: Math.random() * 0.2 + 0.1,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: 'power1.inOut',
      });
    });

    // Scroll-triggered animation for mesh
    if (meshRef.current) {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          if (meshRef.current) {
            gsap.to(meshRef.current, {
              rotation: progress * 360,
              scale: 1 + progress * 0.2,
              duration: 0.3,
              ease: 'power1.out',
            });
          }
        },
      });
    }

    return () => {
      particles.forEach(particle => particle.remove());
      shapes.forEach(shape => shape.remove());
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === 'body') st.kill();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Animated gradient orbs with scroll effect */}
      <div 
        ref={meshRef}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00D4AA]/8 blur-[100px] transition-transform duration-1000"
      />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00D4AA]/6 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[#00D4AA]/7 blur-[60px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] rounded-full bg-[#00D4AA]/5 blur-[70px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Mesh grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 212, 170, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />
    </div>
  );
};

export default AnimatedBackground;
