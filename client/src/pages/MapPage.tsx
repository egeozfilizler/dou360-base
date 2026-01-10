import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FloorMap from "@/components/FloorMap"; // <--- ENTEGRASYON BURADA

interface User {
  id: string;
  name: string;
  email: string;
}

const MapPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!token) {
      navigate("/signin");
      return;
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success("Başarıyla çıkış yapıldı.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative w-full h-screen bg-gray-50 overflow-hidden flex flex-col">
        
        {/* Üst Bilgi Barı (Overlay) */}
        {/* z-index'i yüksek tuttuk ki haritanın üstünde kalsın */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
            
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Kampüs Haritası</h1>
              <p className="text-muted-foreground text-sm">
                Hoşgeldin, <span className="font-semibold text-primary">{user?.name || "Öğrenci"}</span> 👋
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                onClick={() => toast.info("Profil sayfası yakında!")}
              >
                Profilim
              </button>
              
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors shadow-sm"
              >
                Çıkış Yap
              </button>
            </div>

          </div>
        </div>

        {/* --- HARİTA BİLEŞENİ --- */}
        {/* Header'ın (pt-32) altında tüm alanı kaplayacak şekilde yerleştiriyoruz */}
        <div className="flex-1 w-full h-full pt-0 relative z-0">
           <FloorMap />
        </div>

      </section>
    </div>
  );
};

export default MapPage;