import { Code2, Cpu, Globe, Layers, Zap, Layout } from "lucide-react";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan
} from "@/components/ui/terminal";

const techStack = [
  { name: "3D Rendering with Three.js", icon: Globe },
  { name: "Responsive React UI", icon: Layout },
  { name: "Type-Safe Architecture", icon: Code2 },
  { name: "High Performance Core", icon: Zap },
  { name: "Accessible Components", icon: Layers },
  { name: "Modern Web Standards", icon: Cpu },
];

export function About() {
  return (
    <section id="about" className="py-20 lg:py-12 overflow-hidden relative z-10">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center px-4">

          {/* LEFT SIDE: Terminal Simulation */}
          {/* min-w-0: Critical to prevent flex/grid child overflow */}
          <div className="order-2 lg:order-1 w-full min-w-0 flex justify-center items-center relative animate-fade-in delay-100">

            {/* FIX: Added overflow-hidden and rounded-xl to prevent any content overflow regardless of length. */}
            <div className="relative w-full sm:max-w-lg group rounded-xl">

              {/* Badge */}
              <div className="absolute -top-5 right-0 sm:-right-5 z-20 bg-primary text-primary-foreground shadow-xl border-4 border-background p-3 rounded-xl flex items-center gap-3 transform group-hover:scale-105 transition-transform duration-300 mx-0 sm:mx-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] opacity-90 font-medium tracking-wider">BUILT BY</span>
                  <span className="text-xs font-bold tracking-widest uppercase">STUDENTS</span>
                </div>
              </div>

              {/* Background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-600/30 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

              {/* Terminal */}
              {/* text-[10px]: Slightly smaller font on mobile to fit. */}
              {/* break-all: Forces long links to wrap. */}
              {/* whitespace-pre-wrap: Preserves line breaks while allowing long lines to wrap. */}
              <Terminal className="relative shadow-2xl border-white/10 bg-[#0c0c0c] text-slate-200 w-full z-10 overflow-hidden font-mono text-[10px] sm:text-base whitespace-pre-wrap break-all">

                <TypingAnimation className="text-slate-300">
                  &gt; git clone https://github.com/dou/dou360.git
                </TypingAnimation>

                <AnimatedSpan delay={1500} className="text-green-500 font-medium">
                  <span>✔ Repository cloned successfully.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2000} className="text-slate-300">
                  <span>&gt; npm install &amp;&amp; npm run dev</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2500} className="text-blue-400 font-medium">
                  <span>ℹ Starting DOU360 Engine v1.0.0...</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3000} className="text-blue-400 font-medium">
                  <span>ℹ Initializing Three.js WebGL Renderer...</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3500} className="text-green-500 font-medium">
                  <span>✔ 3D Models loaded (campus.glb)</span>
                </AnimatedSpan>

                <AnimatedSpan delay={4000} className="text-green-500 font-medium">
                  <span>✔ WebSocket connection established</span>
                </AnimatedSpan>

                <AnimatedSpan delay={4500} className="text-green-500 font-medium">
                  <span>✔ Live classroom data synced</span>
                </AnimatedSpan>

                <TypingAnimation delay={5000} className="text-primary font-bold mt-2">
                  &gt; Ready to navigate! 🚀
                </TypingAnimation>
              </Terminal>
            </div>
          </div>

          {/* RIGHT SIDE: Content */}
          <div className="animate-fade-in order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              Technological Infrastructure
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Engineered for the <br />
              <span className="text-primary">Future of Navigation</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              DOU360 isn't just a map; it's a <br className="hidden md:block" /> modern web application built to solve <br className="hidden md:block" /> real campus problems. We leverage <br className="hidden md:block" /> cutting-edge technologies like <strong>WebGL</strong> <br className="hidden md:block" /> and <strong>React</strong> to deliver a seamless, fast <br className="hidden md:block" /> and interactive 3D experience directly <br className="hidden md:block" /> in your browser.
            </p>

            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 mb-8">
              {techStack.map((item) => (
                <div key={item.name} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}