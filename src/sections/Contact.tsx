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
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:ramaniashish1999@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Opening your email client... Please send the message from there.');
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
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

      // Form fields - only animate if form exists
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        if (fields.length > 0) {
          scrollTl.fromTo(
            fields,
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.025, ease: 'none' },
            0.14
          );
        }
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
          src={`${import.meta.env.BASE_URL}contact_city_street.jpg`}
          alt="City Street at Night"
          className="bg-image"
          loading="lazy"
          decoding="async"
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
        className="relative z-10 glass rounded-[20px] sm:rounded-[24px] md:rounded-[28px] p-6 sm:p-8 md:p-10 lg:p-12 mx-4 sm:mx-6 md:mx-auto"
        style={{
          width: 'min(92vw, 1080px)',
          minHeight: 'min(50vh, 480px)',
          maxHeight: '90vh',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          {/* Left Content */}
          <div ref={leftContentRef} className="flex flex-col justify-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#F2F5F9] leading-tight mb-4 sm:mb-6">
              Let's Build Something Reliable
            </h2>

            <p className="text-sm sm:text-base text-[#A9B3C2] leading-relaxed mb-6 sm:mb-8">
              Open to full-time, contract, and advisory roles. Let's discuss how
              I can help transform your data infrastructure.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#00D4AA]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D4AA]" />
                </div>
                <span className="text-sm sm:text-base text-[#F2F5F9] break-all">ramaniashish1999@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#00D4AA]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D4AA]" />
                </div>
                <span className="text-sm sm:text-base text-[#A9B3C2]">
                  Dallas, Texas — Open to relocation
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#00D4AA]/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D4AA]" />
                </div>
                <span className="text-sm sm:text-base text-[#A9B3C2]">
                  Currently at WeTechForU
                </span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col justify-center space-y-3 sm:space-y-4"
          >
            <div className="form-field">
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="text-sm sm:text-base"
                required
                autoComplete="name"
              />
            </div>

            <div className="form-field">
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="text-sm sm:text-base"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-field">
              <textarea
                id="contact-message"
                name="message"
                placeholder="What are you building?"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="text-sm sm:text-base resize-none"
                required
              />
            </div>

            <div className="form-field">
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
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
