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
        
        {/* Logout Butonu - Sağ Üst */}
        <div className="absolute top-6 left-6 z-30">
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors shadow-lg"
          >
            Çıkış Yap
          </button>
        </div>

        {/* --- HARİTA BİLEŞENİ --- */}
        <div className="flex-1 w-full h-full pt-0 relative z-0">
           <FloorMap />
        </div>

      </section>
    </div>
  );
};

export default MapPage;