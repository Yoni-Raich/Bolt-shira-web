import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(inputRefs.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 text-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <Mail className="w-8 h-8" />
          <h2 className="text-4xl font-light">צור קשר</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <p className="text-lg text-gray-300 mb-12">
              בואו נדבר על הפרויקט הבא שלכם. בין אם אתם מעוניינים לבנות את בית החלומות שלכם או 
              לפתח מתחם מסחרי, אני כאן כדי להפוך את החזון שלכם למציאות.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>058-7160002</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>shiraraich@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>פתח תקווה, ישראל</span>
              </div>
            </div>
          </div>

          <form ref={formRef} className="space-y-6">
            <input
              ref={el => inputRefs.current[0] = el}
              type="text"
              placeholder="Name"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
            />
            <input
              ref={el => inputRefs.current[1] = el}
              type="email"
              placeholder="Email"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
            />
            <textarea
              ref={el => inputRefs.current[2] = el}
              placeholder="Message"
              rows={6}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
            ></textarea>
            <button
              ref={el => inputRefs.current[3] = el}
              className="w-full bg-white text-gray-900 rounded-lg px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}