import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [step, setStep] = useState<"info" | "verify">("info");
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend'e "Kod Gönder" isteği atıyoruz
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      setStep("verify");

    } catch (error: any) {
      toast.error(error.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend'e Kayıt İsteği (Kodu da gönderiyoruz)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, code: userEnteredCode }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      setTimeout(() => navigate("/signin"), 2000);

    } catch (error: any) {
      toast.error(error.message || "Kayıt başarısız.");
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
              <h1 className="text-2xl font-bold mb-2">Hesap Oluştur</h1>
              <p className="text-muted-foreground">{step === "info" ? "DOU360 deneyimine katılın" : "Mailinizi doğrulayın"}</p>
            </div>
            
            {step === "info" ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                  <input required name="fullName" type="text" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Okul Maili</label>
                  <input required name="email" type="email" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Şifre</label>
                  <input required name="password" type="password" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <button disabled={loading} type="submit" className="w-full btn-primary">
                  {loading ? "İşleniyor..." : "Doğrulama Kodu Gönder"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyAndRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Doğrulama Kodu</label>
                  <input required type="text" placeholder="XXXXXX" onChange={(e) => setUserEnteredCode(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-center tracking-widest text-xl" />
                </div>
                <button disabled={loading} type="submit" className="w-full btn-primary">
                  {loading ? "Kaydediliyor..." : "Kaydı Tamamla"}
                </button>
                <button type="button" onClick={() => setStep("info")} className="w-full text-sm text-muted-foreground hover:underline mt-2">Geri Dön</button>
              </form>
            )}
            <p className="text-center text-muted-foreground text-sm mt-6">Zaten hesabın var mı? <Link to="/signin" className="text-primary hover:underline">Giriş yap</Link></p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;