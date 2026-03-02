import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const cubesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create bright floating particles
    const particleCount = 50;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'animated-particle';
      
      const size = Math.random() * 6 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.6 + 0.4}`;
      particle.style.boxShadow = `0 0 ${size * 3}px rgba(0, 212, 170, 0.8), 0 0 ${size * 6}px rgba(0, 212, 170, 0.4)`;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Animate particles with GSAP
    particles.forEach((particle) => {
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 2;
      
      gsap.to(particle, {
        y: `+=${Math.random() * 400 + 300}`,
        x: `+=${(Math.random() - 0.5) * 200}`,
        rotation: Math.random() * 720,
        opacity: `+=${Math.random() * 0.3 - 0.15}`,
        scale: Math.random() * 0.5 + 0.8,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: 'power1.inOut',
      });
    });

    // Create bright 3D geometric shapes
    const shapeCount = 12;
    const shapes: HTMLDivElement[] = [];

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      shape.className = 'animated-shape';
      
      const size = Math.random() * 120 + 60;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.opacity = `${Math.random() * 0.3 + 0.2}`;
      
      // Random shape type with brighter colors
      const shapeType = Math.floor(Math.random() * 4);
      if (shapeType === 0) {
        shape.style.borderRadius = '50%';
        shape.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.4), rgba(0, 212, 170, 0.2))';
        shape.style.border = '2px solid rgba(0, 212, 170, 0.5)';
        shape.style.boxShadow = `0 0 ${size}px rgba(0, 212, 170, 0.6), inset 0 0 ${size/2}px rgba(0, 212, 170, 0.3)`;
      } else if (shapeType === 1) {
        shape.style.borderRadius = '20%';
        shape.style.background = 'linear-gradient(45deg, rgba(0, 212, 170, 0.35), rgba(0, 212, 170, 0.15))';
        shape.style.border = '2px solid rgba(0, 212, 170, 0.5)';
        shape.style.transform = 'rotate(45deg)';
        shape.style.boxShadow = `0 0 ${size}px rgba(0, 212, 170, 0.5)`;
      } else if (shapeType === 2) {
        shape.style.borderRadius = '0%';
        shape.style.background = 'linear-gradient(90deg, rgba(0, 212, 170, 0.4), transparent)';
        shape.style.border = '2px solid rgba(0, 212, 170, 0.6)';
        shape.style.transform = 'rotate(30deg)';
        shape.style.boxShadow = `0 0 ${size}px rgba(0, 212, 170, 0.5)`;
      } else {
        shape.style.borderRadius = '10%';
        shape.style.background = 'radial-gradient(circle, rgba(0, 212, 170, 0.4), rgba(0, 212, 170, 0.1))';
        shape.style.border = '2px solid rgba(0, 212, 170, 0.5)';
        shape.style.boxShadow = `0 0 ${size}px rgba(0, 212, 170, 0.6)`;
      }
      
      containerRef.current.appendChild(shape);
      shapes.push(shape);
    }

    shapesRef.current = shapes;

    // Animate shapes with 3D rotation
    shapes.forEach((shape) => {
      const duration = Math.random() * 25 + 20;
      const delay = Math.random() * 3;
      
      gsap.to(shape, {
        y: `+=${Math.random() * 500 + 400}`,
        x: `+=${(Math.random() - 0.5) * 300}`,
        rotation: `+=${Math.random() * 720 + 360}`,
        scale: Math.random() * 0.6 + 0.7,
        opacity: `+=${Math.random() * 0.2 - 0.1}`,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: 'power1.inOut',
      });
    });

    // Create bright 3D cubes
    const cubeCount = 6;
    const cubes: HTMLDivElement[] = [];

    for (let i = 0; i < cubeCount; i++) {
      const cube = document.createElement('div');
      cube.className = 'animated-cube';
      
      const size = Math.random() * 100 + 80;
      cube.style.width = `${size}px`;
      cube.style.height = `${size}px`;
      cube.style.left = `${Math.random() * 100}%`;
      cube.style.top = `${Math.random() * 100}%`;
      cube.style.opacity = `${Math.random() * 0.4 + 0.3}`;
      cube.style.background = `linear-gradient(135deg, rgba(0, 212, 170, 0.5), rgba(0, 212, 170, 0.2))`;
      cube.style.border = `3px solid rgba(0, 212, 170, 0.7)`;
      cube.style.borderRadius = '8px';
      cube.style.transform = 'rotateX(45deg) rotateY(45deg)';
      cube.style.transformStyle = 'preserve-3d';
      cube.style.boxShadow = `
        0 0 ${size}px rgba(0, 212, 170, 0.8),
        inset 0 0 ${size/2}px rgba(0, 212, 170, 0.3),
        0 0 ${size * 2}px rgba(0, 212, 170, 0.4)
      `;
      
      containerRef.current.appendChild(cube);
      cubes.push(cube);
    }

    cubesRef.current = cubes;

    // Animate cubes with 3D rotation
    cubes.forEach((cube) => {
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 2;
      
      gsap.to(cube, {
        rotationX: `+=${360}`,
        rotationY: `+=${360}`,
        rotationZ: `+=${180}`,
        y: `+=${Math.random() * 600 + 500}`,
        x: `+=${(Math.random() - 0.5) * 400}`,
        scale: Math.random() * 0.5 + 0.8,
        opacity: `+=${Math.random() * 0.2 - 0.1}`,
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
              scale: 1 + progress * 0.3,
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
      cubes.forEach(cube => cube.remove());
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
      {/* Brighter animated gradient orbs with scroll effect */}
      <div 
        ref={meshRef}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00D4AA]/25 blur-[120px] transition-transform duration-1000"
        style={{ boxShadow: '0 0 200px rgba(0, 212, 170, 0.5)' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00D4AA]/20 blur-[100px] animate-pulse" 
        style={{ animationDelay: '1s', boxShadow: '0 0 150px rgba(0, 212, 170, 0.4)' }} 
      />
      <div 
        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-[#00D4AA]/22 blur-[80px] animate-pulse" 
        style={{ animationDelay: '2s', boxShadow: '0 0 120px rgba(0, 212, 170, 0.4)' }} 
      />
      <div 
        className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-[#00D4AA]/18 blur-[90px] animate-pulse" 
        style={{ animationDelay: '1.5s', boxShadow: '0 0 130px rgba(0, 212, 170, 0.4)' }} 
      />
      <div 
        className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-[#00D4AA]/20 blur-[70px] animate-pulse" 
        style={{ animationDelay: '0.5s', boxShadow: '0 0 100px rgba(0, 212, 170, 0.4)' }} 
      />
      
      {/* Brighter mesh grid pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 212, 170, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 170, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      
      {/* Animated lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="animated-line"
            style={{
              position: 'absolute',
              width: '2px',
              height: '100%',
              background: `linear-gradient(to bottom, transparent, rgba(0, 212, 170, 0.4), transparent)`,
              left: `${20 + i * 20}%`,
              opacity: 0.3,
              animation: `lineMove ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
