import { useState } from "react";
import { Send } from "lucide-react";

export function Contact() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="relative bg-gradient-to-r from-primary to-purple-500 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
          
          {/* Background decoration - OPTİMİZE EDİLDİ */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* 1. Daire: GPU Hızlandırma Eklendi */}
            <div 
              className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl transform-gpu will-change-transform"
              style={{ transform: 'translate3d(0,0,0)' }} 
            />
            
            {/* 2. Daire: GPU Hızlandırma Eklendi */}
            <div 
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl transform-gpu will-change-transform"
              style={{ transform: 'translate3d(0,0,0)' }} 
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter and stay updated with the latest news, tips, and exclusive offers.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>

            <p className="text-white/60 text-sm mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}