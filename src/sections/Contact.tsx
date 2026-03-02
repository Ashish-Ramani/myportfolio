import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Mail, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

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
      // Glass card
      scrollTl.fromTo(
        cardRef.current,
        { y: '40vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Left content (headline + details)
      if (leftContentRef.current) {
        const children = leftContentRef.current.children;
        scrollTl.fromTo(
          children,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.1
        );
      }

      // Form fields
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        scrollTl.fromTo(
          fields,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.025, ease: 'none' },
          0.14
        );
      }

      // EXIT (70-100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pinned flex items-center justify-center"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <img
          src="/contact_city_street.jpg"
          alt="City Street at Night"
          className="bg-image"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(7, 8, 10, 0.7) 0%, rgba(7, 8, 10, 0.95) 100%)',
          }}
        />
      </div>

      {/* Center Glass Card */}
      <div
        ref={cardRef}
        className="relative z-10 glass rounded-[28px] p-8 md:p-12"
        style={{
          width: 'min(86vw, 1080px)',
          minHeight: 'min(60vh, 560px)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Content */}
          <div ref={leftContentRef} className="flex flex-col justify-center">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-[#F2F5F9] leading-tight mb-6">
              Let's Build Something Reliable
            </h2>

            <p className="text-[#A9B3C2] leading-relaxed mb-8">
              Open to full-time, contract, and advisory roles. Let's discuss how
              I can help transform your data infrastructure.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#00D4AA]" />
                </div>
                <span className="text-[#F2F5F9]">ramaniashish1999@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#00D4AA]" />
                </div>
                <span className="text-[#A9B3C2]">
                  Dallas, Texas — Open to relocation
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-[#00D4AA]" />
                </div>
                <span className="text-[#A9B3C2]">
                  Currently at WeTechForU
                </span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="form-field">
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-field">
              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-field">
              <textarea
                placeholder="What are you building?"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>

            <div className="form-field">
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
