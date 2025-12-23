import { useState } from "react";
import { Send, Bug, Lightbulb, AlertCircle } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "bug",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simüle edilmiş gönderim
    setTimeout(() => {
      console.log("Feedback sent:", formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "bug", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/20">
      <div className="container-custom">
        {/* GÜNCELLEME: Gradient Temaya Uygun Hale Getirildi.
           Eski: from-primary via-purple-600 to-blue-600
           Yeni: from-neutral-900 via-neutral-900 to-neutral-800 (Koyu Zemin) + Primary Border
           Bu sayede beyaz yazılar her zaman okunur ve kırmızı renk vurgu olarak kullanılır.
        */}
        <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-primary/20 rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl">
          
          {/* --- Background Decor (Temaya Uygun Kırmızı Vurgular) --- */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              // Rengi bg-primary/20 yaptık
              className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl transform-gpu will-change-transform"
              style={{ transform: 'translate3d(0,0,0)' }} 
            />
            <div 
              // Rengi bg-primary/10 yaptık
              className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform-gpu will-change-transform"
              style={{ transform: 'translate3d(0,0,0)' }} 
            />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT SIDE: Text & Info */}
            <div className="text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium backdrop-blur-md text-white">
                <AlertCircle className="w-4 h-4 text-primary" />
                <span>Help us improve DOU360</span>
              </div>
              
              {/* DÜZELTME: text-white sınıfı explicit olarak eklendi */}
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Spot a Bug or Have a <br />
                <span className="text-primary">Brilliant Idea?</span>
              </h2>
              
              <p className="text-lg text-zinc-400 leading-relaxed max-w-md">
                We are constantly working to make the campus experience better. If you encounter any issues with the map or navigation, please let us know directly.
              </p>

              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Bug className="w-5 h-5 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    {/* DÜZELTME: text-white eklendi */}
                    <h4 className="font-semibold text-white">Report a Bug</h4>
                    <p className="text-sm text-zinc-400">Something not working right?</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Lightbulb className="w-5 h-5 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    {/* DÜZELTME: text-white eklendi */}
                    <h4 className="font-semibold text-white">Request a Feature</h4>
                    <p className="text-sm text-zinc-400">What should we build next?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Form */}
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300 ml-1">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:sm:text-zinc-600 placeholder:text-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300 ml-1">Student Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:sm:text-zinc-600 placeholder:text-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300 ml-1">Subject</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['bug', 'feature', 'other'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({...formData, subject: type})}
                          className={`py-2 px-2 rounded-lg text-sm font-medium capitalize transition-all border ${
                            formData.subject === type 
                              ? "bg-primary text-white border-primary" 
                              : "bg-black/40 text-zinc-400 border-transparent hover:bg-black/60 hover:text-white"
                          }`}
                        >
                          {type === 'bug' ? '🐛 Bug' : type === 'feature' ? '💡 Feature' : '💬 Other'}
                        </button>
                      ))}
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 ml-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the issue or your idea in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:sm:text-zinc-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full py-4 mt-2 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                    submitted 
                      ? "bg-green-600 text-white" 
                      : "bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {submitted ? (
                    <>Sent Successfully!</>
                  ) : (
                    <>
                      {isSubmitting ? "Sending..." : "Send Feedback"}
                      {!isSubmitting && <Send className="w-5 h-5" />}
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}