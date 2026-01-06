import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const data = await res.json(); // Backend'den gelen veriyi al
      
      // Token'ı ve kullanıcı bilgisini tarayıcıya kaydet
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success("Giriş başarılı!");
      navigate("/map");
      
    } catch (error: any) {
      toast.error(error.message || "Giriş yapılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Tekrar Hoşgeldin</h1>
              <p className="text-muted-foreground">Hesabına giriş yap</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input required type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Şifre</label>
                <input required type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <button disabled={loading} type="submit" className="w-full btn-primary">
                {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </button>
            </form>
            <p className="text-center text-muted-foreground text-sm mt-6">Hesabın yok mu? <Link to="/signup" className="text-primary hover:underline">Kayıt ol</Link></p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignIn;