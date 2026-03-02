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

    // Reduced particle count for performance
    const particleCount = 20;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'animated-particle';
      
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
      // Reduced box shadow for performance
      particle.style.boxShadow = `0 0 ${size * 2}px rgba(0, 212, 170, 0.6)`;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Optimized animations using transform (GPU accelerated)
    particles.forEach((particle) => {
      const duration = Math.random() * 25 + 20;
      const delay = Math.random() * 2;
      const moveY = Math.random() * 400 + 300;
      const moveX = (Math.random() - 0.5) * 200;
      
      gsap.to(particle, {
        transform: `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.3 + 0.9})`,
        opacity: Math.random() * 0.4 + 0.3,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: 'none',
        force3D: true, // Force GPU acceleration
      });
    });

    // Reduced shape count
    const shapeCount = 6;
    const shapes: HTMLDivElement[] = [];

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      shape.className = 'animated-shape';
      
      const size = Math.random() * 80 + 50;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.opacity = `${Math.random() * 0.25 + 0.15}`;
      
      // Simplified shapes for performance
      const shapeType = Math.floor(Math.random() * 2);
      if (shapeType === 0) {
        shape.style.borderRadius = '50%';
        shape.style.background = 'rgba(0, 212, 170, 0.3)';
        shape.style.border = '1px solid rgba(0, 212, 170, 0.4)';
      } else {
        shape.style.borderRadius = '20%';
        shape.style.background = 'rgba(0, 212, 170, 0.25)';
        shape.style.border = '1px solid rgba(0, 212, 170, 0.4)';
        shape.style.transform = 'rotate(45deg)';
      }
      
      containerRef.current.appendChild(shape);
      shapes.push(shape);
    }

    shapesRef.current = shapes;

    // Optimized shape animations
    shapes.forEach((shape) => {
      const duration = Math.random() * 30 + 25;
      const delay = Math.random() * 3;
      const moveY = Math.random() * 500 + 400;
      const moveX = (Math.random() - 0.5) * 300;
      const rotation = Math.random() * 720 + 360;
      
      gsap.to(shape, {
        transform: `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg) scale(${Math.random() * 0.4 + 0.8})`,
        opacity: Math.random() * 0.2 + 0.15,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: 'none',
        force3D: true,
      });
    });

    // Reduced cube count
    const cubeCount = 3;
    const cubes: HTMLDivElement[] = [];

    for (let i = 0; i < cubeCount; i++) {
      const cube = document.createElement('div');
      cube.className = 'animated-cube';
      
      const size = Math.random() * 60 + 50;
      cube.style.width = `${size}px`;
      cube.style.height = `${size}px`;
      cube.style.left = `${Math.random() * 100}%`;
      cube.style.top = `${Math.random() * 100}%`;
      cube.style.opacity = `${Math.random() * 0.3 + 0.2}`;
      cube.style.background = `rgba(0, 212, 170, 0.4)`;
      cube.style.border = `2px solid rgba(0, 212, 170, 0.6)`;
      cube.style.borderRadius = '8px';
      // Simplified transform
      cube.style.transform = 'rotate(45deg)';
      
      containerRef.current.appendChild(cube);
      cubes.push(cube);
    }

    cubesRef.current = cubes;

    // Optimized cube animations
    cubes.forEach((cube) => {
      const duration = Math.random() * 25 + 20;
      const delay = Math.random() * 2;
      const moveY = Math.random() * 600 + 500;
      const moveX = (Math.random() - 0.5) * 400;
      
      gsap.to(cube, {
        transform: `translate(${moveX}px, ${moveY}px) rotate(${360}deg) scale(${Math.random() * 0.4 + 0.8})`,
        opacity: Math.random() * 0.2 + 0.2,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: 'none',
        force3D: true,
      });
    });

    // Optimized scroll-triggered animation
    if (meshRef.current) {
      let rafId: number;
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          // Use requestAnimationFrame for smoother updates
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            const progress = self.progress;
            if (meshRef.current) {
              meshRef.current.style.transform = `rotate(${progress * 360}deg) scale(${1 + progress * 0.2})`;
            }
          });
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
      {/* Optimized gradient orbs - reduced blur and count */}
      <div 
        ref={meshRef}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00D4AA]/20"
        style={{ 
          filter: 'blur(60px)',
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#00D4AA]/15"
        style={{ 
          filter: 'blur(50px)',
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: '1s',
        }} 
      />
      <div 
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[#00D4AA]/18"
        style={{ 
          filter: 'blur(40px)',
          animation: 'pulse 5s ease-in-out infinite',
          animationDelay: '2s',
        }} 
      />
      
      {/* Simplified mesh grid - removed for performance */}
    </div>
  );
};

export default AnimatedBackground;
