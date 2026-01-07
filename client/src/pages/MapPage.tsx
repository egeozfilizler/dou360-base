import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

// Simple user type
interface User {
  id: string;
  name: string;
  email: string;
}

const MapPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1. Token and user check
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!token) {
      // If there is no token, redirect to sign-in
      navigate("/signin");
      return;
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    // 2. Clear stored credentials
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    toast.success("Signed out successfully.");
    
    // 3. Redirect to landing page
    // Without a token, the Index page effect will not redirect
    // and the user can see the landing page.
    navigate("/");
  };

  return (
    <Layout>
      {/* Map and UI layer */}
      <section className="relative w-full h-screen bg-neutral-100 overflow-hidden">
        
        {/* Top info bar (overlay) */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left side: greeting */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Campus Map
              </h1>
              <p className="text-muted-foreground">
                Welcome, <span className="font-semibold text-primary">{user?.name || "Student"}</span> 👋
              </p>
            </div>

            {/* Right side: actions */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                My Profile
              </button>
              
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors shadow-sm"
              >
                Sign Out
              </button>
            </div>

          </div>
        </div>

        {/* 3D map area (placeholder) */}
        <div className="w-full h-full flex items-center justify-center text-neutral-400">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-neutral-200 rounded-full mx-auto animate-pulse"></div>
            <p className="text-xl font-medium">Loading 3D campus...</p>
            <p className="text-sm max-w-md mx-auto">
              Three.js / Canvas integration is coming here.
            </p>
          </div>
        </div>

      </section>
    </Layout>
  );
};

export default MapPage;