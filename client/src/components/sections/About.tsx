import { Code2, Cpu, Globe, Layers, Zap, Layout } from "lucide-react";
// Terminal bileşenlerini import ediyoruz
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
          <div className="order-2 lg:order-1 w-full flex justify-center items-center relative animate-fade-in delay-100">
            
            <div className="relative w-full max-w-lg group">
                
                {/* YENİ BADGE TASARIMI: Solid Primary Renk, Beyaz Yazı */}
                <div className="absolute -top-5 -right-5 z-20 bg-primary text-primary-foreground shadow-xl border-4 border-background p-3 rounded-xl flex items-center gap-3 transform group-hover:scale-105 transition-transform duration-300 mx-2">
                  <span className="flex h-3 w-3 relative">
                    {/* Ping animasyonu beyaz yapıldı ki kırmızı üzerinde görünsün */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  <div className="flex flex-col leading-none">
                    <span className="text-[10px] opacity-90 font-medium tracking-wider">BUILT BY</span>
                    <span className="text-xs font-bold tracking-widest uppercase">STUDENTS</span>
                  </div>
                </div>

                {/* Terminal Arka Plan Parlaması (Glow) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-600/30 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

                {/* TERMINAL GÜNCELLENDİ: Light Mode Sorunu Çözüldü */}
                {/* bg-[#0c0c0c]: Her zaman koyu arka plan */}
                {/* text-slate-200: Her zaman açık renk yazı */}
                <Terminal className="relative shadow-2xl border-white/10 bg-[#0c0c0c] text-slate-200 w-full z-10 overflow-hidden font-mono text-sm sm:text-base">
                  
                  {/* Komut satırları için text-slate-300 eklendi */}
                  <TypingAnimation className="text-slate-300">&gt; git clone https://github.com/dou/dou360.git</TypingAnimation>
                  
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
                  
                  {/* Son satır vurgusu */}
                  <TypingAnimation delay={5000} className="text-primary font-bold mt-2">
                    &gt; Ready to navigate! 🚀
                  </TypingAnimation>
                </Terminal>
            </div>
          </div>

          {/* RIGHT SIDE: Content (Aynı Kalıyor) */}
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
              DOU360 isn't just a map; it's a modern web application built to solve real campus problems. We leverage cutting-edge technologies like <strong>WebGL</strong> and <strong>React</strong> to deliver a seamless, fast, and interactive 3D experience directly in your browser.
            </p>

            {/* Tech Stack Grid */}
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