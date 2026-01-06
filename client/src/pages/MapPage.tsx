import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

// Kullanıcı tipi (Basitçe)
interface User {
  id: string;
  name: string;
  email: string;
}

const MapPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1. Token ve Kullanıcı Kontrolü
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!token) {
      // Token yoksa direkt girişe şutla
      navigate("/signin");
      return;
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    // 2. Temizlik İşlemi
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    toast.success("Başarıyla çıkış yapıldı.");
    
    // 3. Ana Sayfaya Yönlendirme
    // Artık token olmadığı için Index.tsx'teki useEffect çalışmayacak 
    // ve kullanıcı Landing Page'i görebilecek.
    navigate("/");
  };

  return (
    <Layout>
      {/* Harita ve Arayüz Katmanı */}
      <section className="relative w-full h-screen bg-neutral-100 overflow-hidden">
        
        {/* Üst Bilgi Barı (Overlay) */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Sol Taraf: Karşılama */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Kampüs Haritası
              </h1>
              <p className="text-muted-foreground">
                Hoşgeldin, <span className="font-semibold text-primary">{user?.name || "Öğrenci"}</span> 👋
              </p>
            </div>

            {/* Sağ Taraf: Aksiyonlar */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
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

        {/* 3D Harita Alanı (Placeholder) */}
        <div className="w-full h-full flex items-center justify-center text-neutral-400">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-neutral-200 rounded-full mx-auto animate-pulse"></div>
            <p className="text-xl font-medium">3D Kampüs Yükleniyor...</p>
            <p className="text-sm max-w-md mx-auto">
              Buraya Three.js / Canvas entegrasyonu gelecek.
            </p>
          </div>
        </div>

      </section>
    </Layout>
  );
};

export default MapPage;