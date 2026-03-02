import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Flowing section animations
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative bg-[#07080A] py-16 md:py-24"
    >
      {/* Background vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(7, 8, 10, 0.8) 100%)',
        }}
      />

      <div className="relative z-10 px-[8vw]">
        {/* Top Content */}
        <div
          ref={contentRef}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12"
        >
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-[#F2F5F9] mb-2">
              Thanks for stopping by.
            </h3>
            <p className="text-[#A9B3C2]">
              © {new Date().getFullYear()} Ashish Ramani. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-xl glass-light flex items-center justify-center text-[#A9B3C2] hover:text-[#00D4AA] hover:border-[#00D4AA]/30 transition-all duration-200"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Image */}
        <div
          ref={imageRef}
          className="overflow-hidden rounded-[28px]"
          style={{ height: 'min(40vh, 400px)' }}
        >
          <img
            src="/footer_bridge.jpg"
            alt="Bridge at Night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-transparent" />
        </div>

        {/* Bottom Links */}
        <div className="mt-12 pt-8 border-t border-[rgba(242,245,249,0.08)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            {['Work', 'Skills', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-xs uppercase tracking-[0.14em] text-[#A9B3C2] hover:text-[#F2F5F9] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <span className="font-mono text-xs text-[#A9B3C2]/60">
            Built with React + GSAP
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
